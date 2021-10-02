import { Category } from "src/entity/category.entity";
import { User } from "src/entity/user.entity";

export interface PostInterface {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: User;
    category: Category;
    created_at: Date;
}
