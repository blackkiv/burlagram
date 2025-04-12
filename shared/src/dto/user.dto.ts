import { ChatDto } from "./chat.dto"

export type UserDto = {
    id: number
    username: string
    chats: ChatDto[]
}

export type UserListDto = Omit<UserDto, 'chats'>
