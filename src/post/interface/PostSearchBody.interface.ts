import { Category } from "src/entity/category.entity";

export interface PostSearchBody {
    id: number,
    title: string,
    content: string,
    category: Category,
    authorId: number,
}
