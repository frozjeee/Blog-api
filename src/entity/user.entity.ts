import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { Comment } from "./comment.entity";
import {Post} from "./post.entity";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "varchar",
        length: 320,
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column("integer", {default: 0})
    balance: number;

    @Column("integer", {default: 0})
    price: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    role: UserRole

    @OneToMany(() => Post, post => post.author, { cascade: true, })
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author, { cascade: true, })
    comments: Comment[];

    @CreateDateColumn()
    registered_at: Date;

}