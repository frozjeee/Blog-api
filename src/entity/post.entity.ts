import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "./users.entity";
import {Category} from "./category.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string

    @Column()
    content: string;

    @ManyToOne(() => Users, users => users.posts, {onDelete: 'CASCADE',})
    author: Users;

    @Column("integer", {default: 0})
    likes: number;

    @Column("integer", {default: 0})
    dislikes: number;

    @Column("integer", {default: 0})
    views: number;

    @OneToMany(() => Comment, comment => comment.Post, { cascade: true, })
    comments: Comment[];

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    
}