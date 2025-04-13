import { UserListDto } from '@biba/shared'
import { createContext, use } from 'react'

export const UserContext = createContext<{
	user: UserListDto
	refreshUser: () => void
} | null>(null)
export const useUser = () => use(UserContext)!
