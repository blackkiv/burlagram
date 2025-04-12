import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatsService } from './chats.service'
import { NewMessageEvent, JoinRoomEvent } from '@biba/shared'
import { BadRequestException } from '@nestjs/common'

@WebSocketGateway(3001, {
	transports: ['websocket'],
	cors: {
		origin: 'http://localhost:5173',
	},
})
export class ChatsGateway {
	@WebSocketServer()
	server: Server

	constructor(private chatsService: ChatsService) {}

	@SubscribeMessage('message')
	async handleEvent(
		@MessageBody() data: NewMessageEvent,
		@ConnectedSocket() socket: Socket,
	): Promise<WsResponse<NewMessageEvent>> {
		const message = await this.chatsService.saveNewMessage(
			data.content,
			data.chatId,
		)
		const room = getRoom(socket)
		if (!room) {
			throw new BadRequestException()
		}
		const content = { chatId: data.chatId, content: message }
		socket.to(room).emit('message', content)
		return { event: 'message', data: content }
	}

	@SubscribeMessage('joinRoom')
	async createRoom(
		@MessageBody() data: JoinRoomEvent,
		@ConnectedSocket() socket: Socket,
	) {
		socket.join(data.chatId.toString())
		socket.to(data.chatId.toString()).emit('joinRoom', { chatId: data.chatId })
	}
}

const getRoom = (socket: Socket) => {
	for (let room of socket.rooms) {
		if (room !== socket.id) {
			return room
		}
	}
}
