import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
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

    @ManyToOne(() => Users, users => users.posts, { onDelete: 'CASCADE' })
    author: Users;

    @Column("integer", {default: 0})
    likes: number;

    @ManyToMany(() => Post, { cascade: true, })
    @JoinTable({
        name: "user_likes_post",
        joinColumn: {
            name: "post",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "likedUser",
            referencedColumnName: "id"
        }
    })
    likedUsers: Users[];

    @Column("integer", {default: 0})
    dislikes: number;

    @ManyToMany(() => Post, { cascade: true, })
    @JoinTable({
        name: "user_dislikes_post",
        joinColumn: {
            name: "post",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "dislikedUser",
            referencedColumnName: "id"
        }
    })
    dislikedUsers: Users[];

    @Column("integer", {default: 0})
    views: number;

    @ManyToMany(() => Post, { cascade: true })
    @JoinTable({
        name: "user_views_post",
        joinColumn: {
            name: "post",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "viewedUser",
            referencedColumnName: "id"
        }
    })
    viewedUsers: Users[];

    @OneToMany(() => Comment, comment => comment.Post, { cascade: true, })
    comments: Comment[];

    @OneToOne(() => Category, { cascade: true, })
    @JoinColumn()
    category: Category;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    
}