import { MessageDto } from "./message.dto"
import { UserListDto } from "./user.dto"

export type ChatDto = {
    id: number
    messages: MessageDto[]
}

export type ChatResponse = ChatDto & { secondUser: UserListDto }

export type ChatListResponse = Omit<ChatResponse, 'messages'>

export type ChatCreateDto = { ids: number[] }
