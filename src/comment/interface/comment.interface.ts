import { Post } from "src/entity/post.entity";
import { shortUserDto } from "src/user/dto/user.dto";

export interface CommentInterface {
    id: number;
    text: string;
    Post: Post;
    isReply: boolean;
    author: shortUserDto;
    replies: CommentInterface[];
    created_at: Date;
}
