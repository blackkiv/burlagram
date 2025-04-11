import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService
    ) { }

    @Get('me')
    meInfo(@Request() req) {
        return req.user
    }

    @Get('list')
    usersList(@Request() req) {
        return this.usersService.findList(req.user)
    }
}
