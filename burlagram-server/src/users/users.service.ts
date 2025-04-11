import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { UserListDto } from './users.dto';
import { User } from 'entities/users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    findOneByUsernameAndPass(username: string, pass: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username, password: pass })
    }

    async register(username: string, pass: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({ username })
        if (user) {
            return null
        }

        return this.usersRepository.save({ username, password: pass })
    }

    findUserData(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username })
    }

    async findList(user: User): Promise<UserListDto[]> {
        const users = await this.usersRepository.find()
        return users.map(user => {
            const { password, chats, id, ...rest } = user
            return rest
        }) ?? []
    }

    findByUsernames(usernames: string[]): Promise<User[]> {
        return this.usersRepository.findBy({ username: In(usernames) })
    }
}
