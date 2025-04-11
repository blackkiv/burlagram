import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {

    constructor(private chatsService: ChatsService) { }

    @Get('me')
    getChats(@Request() req) {
        return this.chatsService.getChats(req.user)
    }

    @Post()
    createChatWith(@Request() req, @Body() data: { usernames: string[] }) {
        return this.chatsService.createChatWith(req.user, data.usernames)
    }

    @Get(':id')
    getChat(@Request() req, @Param('id') id: string) {
        return this.chatsService.getChat(req.user, id)
    }
}
