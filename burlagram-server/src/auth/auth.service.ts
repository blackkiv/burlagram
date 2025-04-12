import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'users/users.service'
import { TokenDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneByUsernameAndPass(
			username,
			pass,
		)
		if (user) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(username: string, pass: string): Promise<TokenDto> {
		const user = await this.validateUser(username, pass)
		const payload = { username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}

	async register(username: string, password: string): Promise<TokenDto> {
		const user = await this.usersService.register(username, password)
		if (!user) {
			throw new UnauthorizedException()
		}
		const payload = { username: user.username }

		return {
			access_token: await this.jwtService.signAsync(payload),
		}
	}
}
