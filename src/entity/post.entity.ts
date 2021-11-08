import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import {User} from "./user.entity";
import {Category} from "./category.entity";

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

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;

    @CreateDateColumn()
    created_at: Date;

}