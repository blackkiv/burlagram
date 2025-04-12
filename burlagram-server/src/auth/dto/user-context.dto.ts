export type UserContext = {
	id: number
	username: string
}

export type RequestContext = {
	user: UserContext
}
