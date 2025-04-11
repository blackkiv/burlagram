import { Stack } from '@mui/material'
import { Chat } from 'components/chat/Chat'
import { UsersList } from 'components/users/UsersList'
import { useEffect, useState } from 'react'

export const ChatLayout = () => {
	const [selectedChat, setSelectedChat] = useState<string | undefined>()

	useEffect(() => {
		console.log(selectedChat)
	}, [selectedChat])

	return (
		<Stack direction="row" spacing={2}>
			<UsersList onChatSelect={setSelectedChat} />
			{/* <ChatsList onChatSelect={setSelectedChat} /> */}
			{selectedChat && (<Chat chatId={selectedChat} />)}
		</Stack>
	)
}
