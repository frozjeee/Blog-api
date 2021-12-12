import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Users } from "./users.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    Post: Post;

    @Column("boolean", {default: 0})
    isReply: boolean;

    @Column()
    text: string;

    @ManyToOne(() => Users, user => user.posts, { onDelete: 'CASCADE' })
    author: Users;

    @ManyToMany(() => Comment, { cascade: true, })
    @JoinTable({
        name: "comment_replies_comment",
        joinColumn: {
            name: "comment",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "response",
            referencedColumnName: "id"
        }
    })
    replies: Comment[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}