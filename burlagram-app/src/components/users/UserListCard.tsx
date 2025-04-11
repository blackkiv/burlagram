import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { UserType } from 'api'
import { useUser } from 'util'

export const UsersListCard = ({ user }: { user: UserType }) => {
	const { user: currentUser } = useUser()

	return (
		<Paper
			elevation={3}
			sx={{
				height: '60px',
			}}
		>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Avatar
					sx={{ height: '60px', width: '60px' }}
					variant="rounded"
					src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
				/>
				<Typography sx={{ width: '100%' }}>
					{user.username === currentUser.username
						? 'saved messages'
						: user.username}
				</Typography>
			</Stack>
		</Paper>
	)
}
