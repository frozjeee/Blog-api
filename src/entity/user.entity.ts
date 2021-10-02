import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import {Post} from "./post.entity";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    password: string;

    @Column("integer", {default: 0})
    balance: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    role: UserRole

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @CreateDateColumn()
    registered_at: Date;

}