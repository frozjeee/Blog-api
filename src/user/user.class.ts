import { UserRole } from "src/entity/user.entity";
import { PostInterface } from "src/post/interface/post.interface";

export class User {
    id: number;
    name: string;
    password: string;
    balance: number;
    role: UserRole;
    posts: PostInterface[];
    registered_at: Date;
}