import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { chatInfo, MessageType, socket } from 'api'
import { useEffect, useState } from 'react'

type PartialMessageType = Partial<MessageType>

export const Chat = ({ chatId }: { chatId: string }) => {
    const $chat = useQuery({ queryKey: ['chatInfo', chatId], queryFn: () => chatInfo({ chatId }) })
    const chat = $chat.data
    // TODO wtf...
    const [messages, setMessages] = useState<Set<PartialMessageType>>(new Set())
    const [message, setMessage] = useState<string>('')

    const sendMessage = (message: PartialMessageType) => {
        socket.emit('send_message', { ...message, chatId: chat?.id })
    }

    useEffect(() => {
        if (!$chat.isLoading && chat) {
            setMessages(new Set(chat.messages))
        }
    }, [$chat.isLoading, chat])

    socket.on('new_message', (message: PartialMessageType & { chatId: string }) => {
        if (message.chatId === chat?.id) {
            setMessages(oldMessages => (new Set([...Array.from(oldMessages.values()), message])))
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
                    <Button onClick={() => sendMessage({ content: message })}>
                        send
                    </Button>
                </Box>
                {Array.from(messages.values()).map(message => (
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