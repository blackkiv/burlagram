import { Button, Stack, TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { login } from 'api'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const LoginPage = () => {
	const navigate = useNavigate()
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<{ username: string; password: string }>()

	const $login = useMutation({
		mutationFn: login,
		onSuccess: () => {
			navigate('/')
		},
		onError: (error) => {
			console.error(error)
		},
	})

	return (
		<form
			onSubmit={handleSubmit((data) => {
				$login.mutate({ ...data })
			})}
		>
			<Stack spacing={1}>
				<Controller
					name="username"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							variant="standard"
							label="username"
							error={!!errors.username}
							helperText={errors.username?.message}
							required
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							variant="standard"
							label="password"
							type="password"
							error={!!errors.password}
							helperText={errors.password?.message}
							required
						/>
					)}
				/>
				<Button type="submit">login (at least try)</Button>
				<Button onClick={() => navigate('/registration')}>
					register me :c
				</Button>
			</Stack>
		</form>
	)
}
