import axios from 'axios'
import { io } from 'socket.io-client'
import {
	UserDto,
	AuthorizationDto,
	UserListDto,
	ChatListResponse,
	ChatCreateDto,
	ChatResponse,
} from '@biba/shared'

export const apiUrl = 'http://localhost:3000'
export const socketUrl = 'http://localhost:3001'

export const socket = io(socketUrl, {
	autoConnect: false,
	transports: ['websocket'],
})

export const userData = async () => {
	const response = await axios.get<UserDto>(`${apiUrl}/users/me`)
	return response.data
}

export const login = async (payload: AuthorizationDto) => {
	const response = await axios.post(`${apiUrl}/auth/login`, payload)
	return response.data
}

export const registration = async (payload: AuthorizationDto) => {
	const response = await axios.post(`${apiUrl}/auth/registration`, payload)
	return response.data
}

export const users = async () => {
	const response = await axios.get<UserListDto[]>(`${apiUrl}/users/list`)
	return response.data
}

export const chats = async () => {
	const response = await axios.get<ChatListResponse[]>(`${apiUrl}/chats/me`)
	return response.data
}

export const createChat = async (payload: ChatCreateDto) => {
	const response = await axios.post<number>(`${apiUrl}/chats`, payload)
	return response.data
}

export const chatInfo = async ({ chatId }: { chatId: number }) => {
	const response = await axios.get<ChatResponse>(`${apiUrl}/chats/${chatId}`)
	return response.data
}
