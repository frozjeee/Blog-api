import { Category } from "src/entity/category.entity";
import { Users } from "src/entity/users.entity";

export interface PostInterface {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: Users;
    likes: number;
    dislikes: number;
    views: number;
    category: Category;
    created_at: Date;
}
