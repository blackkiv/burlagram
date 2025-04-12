export type MessageDto = {
    id: number
    content: string
    author: number
    timestamp: Date
}

export type NewMessageEvent = {
    content: MessageDto
    chatId: number
}

export type JoinRoomEvent = {
    chatId: number
}
