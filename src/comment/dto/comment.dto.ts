import { Post } from "src/entity/post.entity";
import { shortUserDto } from "src/user/dto/user.dto";
import { CommentInterface } from "../interface/comment.interface";

export class commentToUpdate {
    id: number;
    text: string;
}

export class commentToReply {
    parentId: number;
    id: number;
    text: string;
    Post: Post;
    isReply: boolean;
    author: shortUserDto;
    replies: CommentInterface[];
    created_at: Date;
}
