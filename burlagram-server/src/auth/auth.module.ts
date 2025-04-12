import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from 'users/users.module'
import { jwtConstants } from './auth.constants'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './guard/jwt.strategy'

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '10d' },
		}),
		PassportModule,
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
