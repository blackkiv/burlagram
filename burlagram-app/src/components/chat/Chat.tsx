import { MessageDto, NewMessageEvent } from '@biba/shared'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { chatInfo, socket } from 'api'
import { useEffect, useState } from 'react'
import { useUser } from 'util/user-context'

type PartialMessageType = Partial<MessageDto>

export const Chat = ({ chatId }: { chatId: number }) => {
    const user = useUser()

    const $chat = useQuery({ queryKey: ['chatInfo', chatId], queryFn: () => chatInfo({ chatId }) })
    const chat = $chat.data
    const [messages, setMessages] = useState<PartialMessageType[]>([])
    const [message, setMessage] = useState<string>('')

    const sendMessage = (message: PartialMessageType) => {
        socket.emit('message', { content: message, chatId: chat?.id })
    }

    useEffect(() => {
        if (!$chat.isLoading && chat) {
            setMessages(chat.messages)
        }
    }, [$chat.isLoading, chat])

    useEffect(() => {
        socket.on('message', (message: NewMessageEvent) => {
            console.log(message)
            if (message.chatId === chat?.id) {
                setMessages(oldMessages => ([...oldMessages, message.content]))
            }
        })

        return () => {
            socket.off('message')
        }
    })

    return !$chat.isLoading ? (
        <Paper elevation={2}>
            <Stack sx={{
                width: '60em'
            }}>
                <Box>
                    <TextField
                        label="message"
                        onChange={event => setMessage(event.target.value ?? '')}
                    />
                    <Button onClick={() => sendMessage({ content: message, author: user.user.id })}>
                        send
                    </Button>
                </Box>
                {messages.map(message => (
                    <Box key={message.id}>
                        <Typography>{message.content}</Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    ) : (
        <Typography>loading...</Typography>
    )
}