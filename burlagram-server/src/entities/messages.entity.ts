import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { Chat } from "./chats.entity"

@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'json' })
    content: string

    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat

    @CreateDateColumn()
    timestamp: Date
}
