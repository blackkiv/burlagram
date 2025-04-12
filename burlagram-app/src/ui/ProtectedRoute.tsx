import { useQuery } from '@tanstack/react-query'
import { socket, userData } from 'api'
import { AxiosError } from 'axios'
import { ReactNode, Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from 'util'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const $userData = useQuery({ queryKey: ['userData'], queryFn: userData })

	useEffect(() => {
		if ($userData.error instanceof AxiosError) {
			const error = $userData.error
			if (error.status === 401) {
				navigate('/login')
			}
		}
	}, [$userData.error])

	const user = $userData.data

	useEffect(() => {
		if (user) {
			socket.connect()
		}
	}, [user])

	return (
		!$userData.isLoading &&
		user && (
			<Suspense>
				<UserContext
					value={{ user, refreshUser: async () => await $userData.refetch() }}
				>
					{children}
				</UserContext>
			</Suspense>
		)
	)
}
