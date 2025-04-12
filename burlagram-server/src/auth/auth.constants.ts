import 'dotenv/config'

export const jwtConstants = {
	secret: process.env.JWT_SECRET!,
}

export const passConstants = {
	salt: Number(process.env.PASS_SALT!),
}
