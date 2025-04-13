import { Box, Paper, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { chats } from 'api'
import { ChatsListCard } from './ChatListCard'

export const ChatsList = ({
	onChatSelect,
}: {
	onChatSelect: (chatId: number) => void
}) => {
	const $chats = useQuery({ queryKey: ['chats'], queryFn: chats })
	const chatsData = $chats.data

	return !$chats.isLoading ? (
		<Paper elevation={2}>
			<Stack
				sx={{
					width: '20em',
				}}
			>
				{chatsData?.map((chat) => {
					return (
						<Box
							sx={{ m: 1 }}
							key={chat.id}
							onClick={() => onChatSelect(chat.id)}
						>
							<ChatsListCard user={chat.secondUser} />
						</Box>
					)
				}) ?? []}
			</Stack>
		</Paper>
	) : (
		<Typography>loading...</Typography>
	)
}
