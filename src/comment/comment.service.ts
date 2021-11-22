import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment as CommentEntity } from 'src/entity/comment.entity';
import { PostInterface } from 'src/post/interface/post.interface';
import { User } from 'src/user/user.class';
import { getConnectionManager, getManager, getRepository, Repository } from 'typeorm';
import { commentToReply, commentToUpdate } from './dto/comment.dto';
import { CommentInterface } from './interface/comment.interface';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        ){}

        writeComment(comment: CommentInterface, user: User) {
            comment.author = user["user"];
            return from(this.commentRepository.save(
                {
                    ...comment
                }
            ))
            }
        

        replyOnComment(comment: commentToReply, user: User) {
            const entityManager = getManager();
            comment.author = user["user"];
            comment.isReply = true;
            const parentId = comment.parentId;
            delete comment.parentId;

            return from(this.commentRepository.save(
                {
                    ...comment
                }
            )).pipe(
                map((comment) => {
                    from(entityManager.query(`INSERT INTO comment_replies_comment (comment, response) VALUES (${parentId}, ${comment.id})`));
                    return comment;
                })
            )
        };

        updateComment(comment: commentToUpdate) {
            return from(this.commentRepository.update({id: comment.id}, {text: comment.text}));
        }

        getAllPostComments(post: PostInterface) {
            const entityManager = getManager();
            return from(entityManager.query(
            `select comment.id, comment.text, comment."postId", comment.created_at, comment."authorId", users.name, users.role from comment
            inner join users on users.id = comment."authorId"
            where comment."postId" = ${post.id} and comment."isReply" = false`));
        }

        getAllCommentReplies(comment: CommentInterface) {
            const entityManager = getManager();
            return from(entityManager.query(
            `select comment.id, comment."postId", comment."isReply", comment."authorId", comment.created_at, users.name, users.role from comment_replies_comment
            inner join comment on comment_replies_comment.comment = ${comment.id}
            inner join users on users.id = comment."authorId"
            where comment_replies_comment.response = comment.id`));
        }


}
