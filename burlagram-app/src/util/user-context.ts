import { UserType } from 'api'
import { createContext, use } from 'react'

export const UserContext = createContext<{
	user: UserType
	refreshUser: () => void
} | null>(null)
export const useUser = () => use(UserContext)!
