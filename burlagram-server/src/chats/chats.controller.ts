import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common'
import { ChatsService } from './chats.service'
import { RequestContext } from 'auth/dto/user-context.dto'
import { ChatListResponse, ChatResponse } from '@biba/shared'

@Controller('chats')
export class ChatsController {
	constructor(private chatsService: ChatsService) {}

	@Get('me')
	getChats(@Request() req: RequestContext): Promise<ChatListResponse[]> {
		return this.chatsService.getChats(req.user)
	}

	@Post()
	createChatWith(
		@Request() req: RequestContext,
		@Body() data: { ids: number[] },
	): Promise<number> {
		return this.chatsService.createChatWith(req.user, data.ids)
	}

	@Get(':id')
	getChat(
		@Request() req: RequestContext,
		@Param('id') id: number,
	): Promise<ChatResponse | null> {
		return this.chatsService.getChat(req.user, id)
	}
}
