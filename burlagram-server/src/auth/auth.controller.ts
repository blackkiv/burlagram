import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './decorator/public.decorator'
import { Response } from 'express'
import { AuthorizationDto } from '@biba/shared'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('login')
	async login(
		@Body() registrationDto: AuthorizationDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const accessCookie = await this.authService.login(
			registrationDto.username,
			registrationDto.password,
		)
		res.cookie('access_token', accessCookie.access_token, { httpOnly: true })
	}

	@Public()
	@Post('registration')
	async register(
		@Body() registrationDto: AuthorizationDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const accessCookie = await this.authService.register(
			registrationDto.username,
			registrationDto.password,
		)
		res.cookie('access_token', accessCookie.access_token, { httpOnly: true })
	}
}
