import axios from 'axios'

const externalUrl = 'localhost:3000'

export const apiUrl = `http://${externalUrl}`
// export const wsUrl = `ws://${externalUrl}/ws` // TODO

export type UserType = {
	username: string
}

export const userData = async () => {
	const response = await axios.get<UserType>(`${apiUrl}/users/me`)
	return response.data
}

export type LoginPayload = {
	username: string
	password: string
}

export type TokenResponse = {
	access_token: string
}

export const login = async (payload: LoginPayload) => {
	const response = await axios.post(`${apiUrl}/auth/login`, payload)
	return response.data
}

export const registration = async (payload: LoginPayload) => {
	const response = await axios.post(`${apiUrl}/auth/registration`, payload)
	return response.data
}

export type UserListType = {
	username: string
}

export const users = async () => {
	const response = await axios.get<UserListType[]>(`${apiUrl}/users/list`)
	return response.data
}

export type ChatListType = {
	id: string
	secondUser: UserListType
}

export const chats = async () => {
	const response = await axios.get<ChatListType[]>(`${apiUrl}/chats/me`)
	return response.data
}

export type CreateChatPayload = {
	usernames: string[]
}

export const createChat = async (payload: CreateChatPayload) => {
	const response = await axios.post<string>(`${apiUrl}/chats`, payload)
	return response.data
}

export type MessageType = {
	id: string
	content: string
}

export type ChatType = {
	id: string,
	messages: MessageType[]
}

export const chatInfo = async ({ chatId }: { chatId: string }) => {
	const response = await axios.get<ChatType>(`${apiUrl}/chats/${chatId}`)
	return response.data
}
