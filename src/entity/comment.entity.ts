import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Post, post => post.comments, {onDelete: 'CASCADE',})
    Post: Post;

    @Column("boolean", {default: 0})
    isReply: boolean;

    @Column()
    text: string;

    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE',})
    author: User;

    @ManyToMany(() => Comment)
    @JoinTable()
    replies: Comment[];

}