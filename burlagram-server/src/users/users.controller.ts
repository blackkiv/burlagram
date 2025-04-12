import { Controller, Get, Request } from '@nestjs/common'
import { UsersService } from './users.service'
import { RequestContext } from 'auth/dto/user-context.dto'

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('me')
	meInfo(@Request() req: RequestContext) {
		return req.user
	}

	@Get('list')
	usersList(@Request() req: RequestContext) {
		return this.usersService.findList(req.user)
	}
}
