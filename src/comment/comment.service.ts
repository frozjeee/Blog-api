import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment as CommentEntity } from 'src/entity/comment.entity';
import { PostInterface } from 'src/post/interface/post.interface';
import { User } from 'src/user/user.class';
import { Repository } from 'typeorm';
import { CommentInterface } from './interface/comment.interface';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        ){}

        writeComment(comment: CommentInterface, user: User) {
            console.log(comment);
            comment.author = user["user"];
            return from(this.commentRepository.save(
                {
                    ...comment
                }
            ))
        }

        getAllPostComments(post: PostInterface) {
            return from(this.commentRepository.find({
                where: {
                    postId: post,
                },
                relations: ['author'],
            })
            )
        }


}
