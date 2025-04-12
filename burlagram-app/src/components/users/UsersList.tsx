import { Box, Paper, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createChat, users } from 'api'
import { UsersListCard } from './UserListCard'

export const UsersList = ({ onChatSelect }: { onChatSelect: (chatId: number) => void }) => {
	const $users = useQuery({ queryKey: ['users'], queryFn: users })
	const usersData = $users.data

	const $createChat = useMutation({ mutationFn: createChat, onSuccess: data => onChatSelect(data) })

	return !$users.isLoading ? (
		<Paper elevation={2}>
			<Stack
				sx={{
					width: '20em',
				}}
			>
				{usersData?.map((user) => {
					return (
						<Box sx={{ m: 1 }} key={user.id} onClick={() => {
							$createChat.mutate({ ids: [user.id] })
						}}>
							<UsersListCard user={user} />
						</Box>
					)
				}) ?? []}
			</Stack>
		</Paper>
	) : (
		<Typography>loading...</Typography>
	)
}
