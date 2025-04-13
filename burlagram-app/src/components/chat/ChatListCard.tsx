import { UserListDto } from '@biba/shared'
import { Avatar, Paper, Stack, Typography } from '@mui/material'
import { useUser } from 'util/user-context'

export const ChatsListCard = ({ user }: { user: UserListDto }) => {
	const { user: currentUser } = useUser()

	return (
		<Paper
			elevation={3}
			sx={{
				height: '4em',
			}}
		>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'stretch',
				}}
			>
				<Avatar
					sx={{ height: '60px', width: '60px' }}
					variant="rounded"
					src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
				/>
				<Stack
					spacing={1}
					sx={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'flex-start',
					}}
				>
					<Typography variant="body1">
						{user.username === currentUser.username
							? 'saved messages'
							: user.username}
					</Typography>
					<Typography variant="caption">aboba</Typography>
				</Stack>
				<Stack spacing={1} sx={{ p: 1 }}>
					1:10pm
				</Stack>
			</Stack>
		</Paper>
	)
}
