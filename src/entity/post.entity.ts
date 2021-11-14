import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import {User} from "./user.entity";
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

    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE',})
    author: User;

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

    @CreateDateColumn()
    created_at: Date;

    
}