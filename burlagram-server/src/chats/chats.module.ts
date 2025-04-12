import { Module } from '@nestjs/common'
import { ChatsController } from './chats.controller'
import { ChatsService } from './chats.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from 'users/users.module'
import { Chat } from 'entities/chats.entity'
import { Message } from 'entities/messages.entity'
import { User } from 'entities/users.entity'
import { ChatsGateway } from './chats.gateway'

@Module({
	imports: [TypeOrmModule.forFeature([Chat, Message, User]), UsersModule],
	controllers: [ChatsController],
	providers: [ChatsService, ChatsGateway],
	exports: [ChatsService],
})
export class ChatsModule {}
