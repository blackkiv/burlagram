import { MessageDto } from '@biba/shared'
import { Send } from '@mui/icons-material'
import { Button, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type FormValues = Pick<MessageDto, 'content'>

export const SendMessage = ({
	onSend,
}: {
	onSend: (message: Partial<MessageDto>) => void
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormValues>({ defaultValues: { content: '' } })

	return (
		<form
			onSubmit={handleSubmit((values) => {
				onSend(values)
				setValue('content', '')
			})}
		>
			<Stack direction="row" sx={{ p: 1, mt: 1 }}>
				<Controller
					name="content"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							variant="standard"
							placeholder="type your message"
							error={!!errors.content}
							helperText={errors.content?.message}
							required
							fullWidth
							sx={{
								width: '100%',
							}}
						/>
					)}
				/>
				<Button type="submit">
					<Send />
				</Button>
			</Stack>
		</form>
	)
}
