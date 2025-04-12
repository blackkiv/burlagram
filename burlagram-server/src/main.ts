import { NestFactory } from '@nestjs/core'
import { AppModule } from 'app.module'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'

async function bootstrap() {
	config()
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
	app.use(cookieParser())

	await app.listen(process.env.PORT ?? 3000)

	app.enableShutdownHooks()
}
bootstrap()
