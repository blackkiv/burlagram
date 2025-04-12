import { Message } from 'entities/messages.entity'
import { User } from 'entities/users.entity'

export type ChatResponse = {
	id: string
	messages: Message[]
	receiver: Omit<User, 'password'>
}
