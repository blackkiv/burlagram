import { Stack } from '@mui/material'
import { Chat } from 'components/chat/Chat'
import { UsersList } from 'components/users/UsersList'
import { useState } from 'react'

export const ChatLayout = () => {
	const [selectedChat, setSelectedChat] = useState<number | undefined>()

	return (
		<>
			{/* <Box sx={{
				cursor: 'pointer'
			}}>
				<img src="./burlagram.png" onClick={() => { window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }} />
			</Box> */}
			<Stack direction="row" spacing={2}>
				<UsersList onChatSelect={setSelectedChat} />
				{/* <ChatsList onChatSelect={setSelectedChat} /> */}
				{selectedChat && (<Chat chatId={selectedChat} />)}
			</Stack>
		</>
	)
}
