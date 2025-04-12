import { Message } from 'entities/messages.entity'
import {
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './users.entity'

@Entity()
export class Chat {
	@PrimaryGeneratedColumn()
	id: number

	@OneToMany((type) => Message, (message) => message.chat)
	messages: Message[]

	@Column({ unique: true })
	usersHash: string

	@ManyToMany(() => User, (user) => user.chats)
	users: User[]
}
