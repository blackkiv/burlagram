import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chats.entity";

@Entity({ name: 'app_user' })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @ManyToMany(() => Chat, chat => chat.users)
    @JoinTable({
        name: 'users_chats'
    })
    chats: Chat[]
}