import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginPage } from './auth/LoginPage'
import { ProtectedRoute } from 'ui/ProtectedRoute'
import './App.css'
import { RegistrationPage } from './auth/RegistrationPage'
import { ChatLayout } from './chat/ChatLayout'
import { createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

export const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<ChatLayout />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace={true} />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}
