import { Module } from '@nestjs/common'
import { DbModule } from 'db/db.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/guard/jwt-auth.guard';
import { ChatsModule } from './chats/chats.module';

@Module({
	imports: [DbModule, AuthModule, UsersModule, ChatsModule],
	providers: [
		{ provide: APP_GUARD, useClass: JwtAuthGuard }
	]
})
export class AppModule { }
