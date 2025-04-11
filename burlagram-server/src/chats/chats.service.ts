import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'users/users.service';
import { Chat } from 'entities/chats.entity';
import { User } from 'entities/users.entity';
import { computeUsersHash } from 'util/hash.util';

@Injectable()
export class ChatsService {

    private readonly logger = new Logger(ChatsService.name)

    constructor(
        @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        private usersService: UsersService,
    ) { }

    async getChats(user: User) {
        const userData = await this.usersRepository.findOne({
            relations: ['chats', 'chats.users'],
            where: {
                username: user.username
            }
        })

        return userData?.chats.map(chat => {
            const tempSecondUser = chat.users.filter(chatUser => chatUser.username !== user.username)[0] ?? chat.users[0]
            const { password, ...secondUser } = tempSecondUser
            return { id: chat.id, secondUser }
        })
    }

    async createChatWith(user: User, usernames: string[]): Promise<string> {
        const usersHash = computeUsersHash([user.username, ...usernames])
        const existingChat = await this.chatsRepository.findOneBy({ usersHash })

        if (existingChat) {
            return existingChat.id
        }

        const users = await this.usersService.findByUsernames([user.username, ...usernames])

        const chat = await this.chatsRepository.save({ messages: [], users, usersHash })
        return chat.id
    }

    async getChat(user: User, chatId: string): Promise<Partial<Chat> | null> {
        const chat = await this.chatsRepository.findOne({
            relations: ['messages'],
            where: {
                id: chatId,
                users: {
                    username: user.username
                }
            }
        })

        if (!chat) {
            throw new BadRequestException()
        }

        const { usersHash, ...selectedChat } = chat

        return selectedChat
    }
}
