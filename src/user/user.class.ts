import { UserRole } from "src/entity/user.entity";
import { PostInterface } from "src/post/interface/post.interface";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    
    balance: number;
    role: UserRole;
    posts: PostInterface[];
    registered_at: Date;
}