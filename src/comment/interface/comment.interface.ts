import { Post } from "src/entity/post.entity";
import { User } from "src/entity/user.entity";

export interface CommentInterface {
    id: number;
    text: string;
    Post: Post;
    isReply: boolean;
    author: User;
    replies: CommentInterface[];
}
