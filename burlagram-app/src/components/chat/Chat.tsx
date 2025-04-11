import { Paper, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { chatInfo } from 'api'

export const Chat = ({ chatId }: { chatId: string }) => {
    const $chat = useQuery({ queryKey: ['chatInfo', chatId], queryFn: () => chatInfo({ chatId }) })
    const chat = $chat.data

    return !$chat.isLoading ? (
        <Paper elevation={2}>
            <Stack sx={{
                width: '80em'
            }}>
                {chat?.id}
            </Stack>
        </Paper>
    ) : (
        <Typography>loading...</Typography>
    )
}