import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from 'users/users.service'
import { Chat } from 'entities/chats.entity'
import { User } from 'entities/users.entity'
import { computeUsersHash } from 'util/hash.util'
import { Message } from 'entities/messages.entity'
import { UserContext } from 'auth/dto/user-context.dto'
import { ChatListResponse, ChatResponse } from '@biba/shared'

@Injectable()
export class ChatsService {
	private readonly logger = new Logger(ChatsService.name)

	constructor(
		@InjectRepository(Chat) private chatsRepository: Repository<Chat>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		@InjectRepository(Message) private messagesRepository: Repository<Message>,
		private usersService: UsersService,
	) {}

	async getChats(user: UserContext): Promise<ChatListResponse[]> {
		const userData = await this.usersRepository.findOne({
			relations: ['chats', 'chats.users'],
			where: {
				id: user.id,
			},
		})

		if (!userData) {
			return []
		}

		return userData?.chats.map((chat) => {
			const tempSecondUser =
				chat.users.filter((chatUser) => chatUser.id !== user.id)[0] ??
				chat.users[0]
			const { password, ...secondUser } = tempSecondUser
			return { id: chat.id, secondUser }
		})
	}

	async createChatWith(user: UserContext, userIds: number[]): Promise<number> {
		const usersHash = computeUsersHash([user.id, ...userIds])
		const existingChat = await this.chatsRepository.findOneBy({ usersHash })

		if (existingChat) {
			return existingChat.id
		}

		const users = await this.usersService.findByIds([user.id, ...userIds])

		const chat = await this.chatsRepository.save({
			messages: [],
			users,
			usersHash,
		})
		return chat.id
	}

	async getChat(
		user: UserContext,
		chatId: number,
	): Promise<ChatResponse | null> {
		const chat = await this.chatsRepository.findOne({
			relations: ['messages', 'users'],
			where: {
				id: chatId,
				users: {
					id: user.id,
				},
			},
		})

		if (!chat) {
			throw new BadRequestException()
		}

		const tempSecondUser =
			chat.users.filter((chatUser) => chatUser.id !== user.id)[0] ??
			chat.users[0]
		const { password, ...secondUser } = tempSecondUser

		return { id: chat.id, messages: chat.messages, secondUser }
	}

	async saveNewMessage(
		message: Partial<Message>,
		chatId: number,
	): Promise<Omit<Message, 'chat'>> {
		const chat = await this.chatsRepository.findOneBy({ id: chatId })
		if (!chat) {
			throw new BadRequestException()
		}

		const savedMessage = await this.messagesRepository.save({
			content: message.content,
			chat: chat,
			author: message.author,
		})

		const { chat: messageChat, ...rest } = savedMessage

		return rest
	}
}
