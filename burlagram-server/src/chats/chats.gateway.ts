import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ChatsService } from './chats.service'
import { NewMessageEvent } from '@biba/shared'

@WebSocketGateway(3001, {
	transports: ['websocket'],
	cors: {
		origin: 'http://localhost:5173',
	},
})
export class ChatsGateway {
	constructor(private chatsService: ChatsService) {}

	@SubscribeMessage('message')
	async handleEvent(
		@MessageBody() data: NewMessageEvent,
		@ConnectedSocket() client: Socket,
	): Promise<WsResponse<unknown>> {
		const message = await this.chatsService.saveNewMessage(
			data.content,
			data.chatId,
		)
		return {
			event: 'message',
			data: { chatId: data.chatId, content: message },
		}
	}
}
