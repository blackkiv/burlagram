import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WsResponse,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ChatsService } from './chats.service'

@WebSocketGateway(3001, {
	transports: ['websocket'],
	cors: {
		origin: 'http://localhost:5173',
	},
})
export class ChatsGateway {
	constructor(private chatsService: ChatsService) {}

	@SubscribeMessage('send_message')
	async handleEvent(
		@MessageBody() data: { content: any; chatId: string },
		@ConnectedSocket() client: Socket,
	): Promise<WsResponse<unknown>> {
		const message = await this.chatsService.saveNewMessage(
			data.content,
			data.chatId,
		)
		return { event: 'new_message', data: { ...message, chatId: data.chatId } }
	}
}
