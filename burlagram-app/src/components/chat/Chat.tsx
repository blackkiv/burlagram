import { JoinRoomEvent, MessageDto, NewMessageEvent } from '@biba/shared'
import { Box, darken, Paper, Stack, SxProps, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { chatInfo, socket } from 'api'
import { useEffect, useRef, useState } from 'react'
import { useUser } from 'util/user-context'
import { SendMessage } from './chat-window/SendMessage'
import { UsersListCard } from 'components/users/UserListCard'

type PartialMessageType = Partial<MessageDto>

const commonMessage: SxProps = {
	position: 'relative',
	maxWidth: '60%',
	color: '#000000',
	p: '10px',
	border: '1px solid #ffffff',
	borderRadius: '10px',
	lineBreak: 'anywhere',
	textAlign: 'start',
}

const authorMessage: SxProps = {
	...commonMessage,
	backgroundColor: '#f8e896',
	borderColor: '#dfd087',
	marginRight: '20px',
	'&:after': {
		content: "''",
		position: 'absolute',
		width: '0',
		height: '0',
		borderTop: '15px solid #f8e896',
		borderLeft: '15px solid transparent',
		borderRight: '15px solid transparent',
		top: '0',
		right: '-15px',
	},
	'&:before': {
		content: "''",
		position: 'absolute',
		width: '0',
		height: '0',
		borderTop: '17px solid #dfd087',
		borderLeft: '16px solid transparent',
		borderRight: '16px solid transparent',
		top: '-1px',
		right: '-17px',
	},
}

const notAuthorMessage: SxProps = {
	...commonMessage,
	backgroundColor: '#a8ddfd',
	borderColor: '#97C6E3',
	marginLeft: '20px',
	'&:after': {
		content: "''",
		position: 'absolute',
		width: '0',
		height: '0',
		borderTop: '15px solid #a8ddfd',
		borderLeft: '15px solid transparent',
		borderRight: '15px solid transparent',
		top: '0',
		left: '-15px',
	},
	'&:before': {
		content: "''",
		position: 'absolute',
		width: '0',
		height: '0',
		borderTop: '17px solid #97C6E3',
		borderLeft: '16px solid transparent',
		borderRight: '16px solid transparent',
		top: '-1px',
		left: '-17px',
	},
}

export const Chat = ({ chatId }: { chatId: number }) => {
	const user = useUser()

	const $chat = useQuery({
		queryKey: ['chatInfo', chatId],
		queryFn: () => chatInfo({ chatId }),
	})
	const chat = $chat.data
	const [messages, setMessages] = useState<PartialMessageType[]>([])

	const sendMessage = (message: PartialMessageType) => {
		socket.emit('message', { content: message, chatId: chat?.id })
	}

	const messagesEndRef = useRef<null | HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	useEffect(() => {
		if (!$chat.isLoading && chat) {
			setMessages(chat.messages)
		}
	}, [$chat.isLoading, chat])

	useEffect(() => {
		socket.on('message', (message: NewMessageEvent) => {
			if (message.chatId === chat?.id) {
				setMessages((oldMessages) => [...oldMessages, message.content])
			}
		})

		socket.on('joinRoom', (_message: JoinRoomEvent) => {
			// console.log(message)
		})

		return () => {
			socket.off('message')
			socket.off('joinRoom')
		}
	})

	useEffect(() => {
		console.log(`joining room ${chatId}`)
		socket.emit('joinRoom', { chatId })
	}, [chatId])

	const isAuthor = (message: PartialMessageType) => {
		return message.author === user.user.id
	}

	return !$chat.isLoading && chat ? (
		<Paper elevation={2}>
			<Stack
				sx={{
					width: '60em',
					height: '60em',
				}}
			>
				<Paper elevation={3} sx={{ width: '100%' }}>
					<UsersListCard user={chat.secondUser} />
				</Paper>
				<Paper
					elevation={1}
					sx={{
						width: '100%',
						height: '100%',
						overflowY: 'auto',
						display: 'flex',
						flexGrow: 1,
						flexDirection: 'column',
						maxHeight: '100%',
					}}
				>
					{messages.map((message) => (
						<Box
							key={message.id}
							sx={{
								m: 1,
								display: 'flex',
								justifyContent: isAuthor(message) ? 'flex-end' : 'flex-start',
							}}
						>
							<Box sx={isAuthor(message) ? authorMessage : notAuthorMessage}>
								<Typography>{message.content}</Typography>
							</Box>
						</Box>
					))}
					<div ref={messagesEndRef} />
				</Paper>
				<Paper elevation={3} sx={{ width: '100%', height: '4.5em' }}>
					<SendMessage
						onSend={(message) => {
							sendMessage({ content: message.content, author: user.user.id })
						}}
					/>
				</Paper>
			</Stack>
		</Paper>
	) : (
		<Typography>loading...</Typography>
	)
}
