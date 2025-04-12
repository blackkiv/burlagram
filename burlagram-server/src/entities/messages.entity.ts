import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from 'typeorm'
import { Chat } from './chats.entity'

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'json' })
	content: string

	@ManyToOne((type) => Chat, (chat) => chat.messages)
	chat: Chat

	@Column()
	author: number

	@CreateDateColumn()
	timestamp: Date
}
