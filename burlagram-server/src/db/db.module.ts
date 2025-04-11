import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "entities/messages.entity";
import 'dotenv/config'
import { Chat } from "entities/chats.entity";
import { User } from "entities/users.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [User, Chat, Message],
    synchronize: true,
    autoLoadEntities: true,
  })]
})
export class DbModule { }