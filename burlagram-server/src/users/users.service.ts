import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Not, Repository } from 'typeorm'
import { User } from 'entities/users.entity'
import { passConstants } from 'auth/auth.constants'
import { compare as hashCompare, hash } from 'bcrypt'
import { UserContext } from 'auth/dto/user-context.dto'
import { UserDto, UserListDto } from '@biba/shared'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
	) {}

	async findOneByUsernameAndPass(
		username: string,
		pass: string,
	): Promise<UserDto | null> {
		const user = await this.usersRepository.findOneBy({ username })

		if (user) {
			const samePass = await hashCompare(pass, user.password)
			if (samePass) {
				const { password: userPassword, ...rest } = user
				return rest
			}
		}
		return null
	}

	async register(username: string, pass: string): Promise<User | null> {
		const user = await this.usersRepository.findOneBy({ username })
		if (user) {
			return null
		}

		const password = await hash(pass, passConstants.salt)

		return this.usersRepository.save({ username, password })
	}

	async findList(user: UserContext): Promise<UserListDto[]> {
		const users = await this.usersRepository.find()

		return (
			users.map((user) => {
				const { password, chats, ...rest } = user
				return rest
			}) ?? []
		)
	}

	findByIds(userIds: number[]): Promise<User[]> {
		return this.usersRepository.findBy({ id: In(userIds) })
	}
}
