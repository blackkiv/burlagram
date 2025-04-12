import { TokenDto, UserDto } from '@biba/shared'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<UserDto | null> {
		const user = await this.usersService.findOneByUsernameAndPass(
			username,
			password,
		)
		return user
	}

	async login(username: string, password: string): Promise<TokenDto> {
		const user = await this.validateUser(username, password)
		if (!user) {
			throw new UnauthorizedException()
		}
		const payload = { id: user.id, username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}

	async register(username: string, password: string): Promise<TokenDto> {
		const user = await this.usersService.register(username, password)
		if (!user) {
			throw new UnauthorizedException()
		}
		const payload = { id: user.id, username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
