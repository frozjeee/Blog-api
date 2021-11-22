import { UserRole } from "src/entity/users.entity";
import { PostInterface } from "src/post/interface/post.interface";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    balance: number;
    role: UserRole;
    posts: PostInterface[];
    registered_at: Date;
}