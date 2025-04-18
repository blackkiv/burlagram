import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from '../auth.constants'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const data = request?.cookies['access_token']
					if (!data) {
						return null
					}
					return data
				},
			]),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret!,
		})
	}

	async validate(payload: any) {
		return { id: payload.id, username: payload.username }
	}
}
