import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostInterface } from 'src/post/interface/post.interface';
import { CommentService } from './comment.service';
import { commentToReply, commentToUpdate } from './dto/comment.dto';
import { CommentInterface } from './interface/comment.interface';

@Controller('comment')
export class CommentController {

    constructor(
        private readonly commentService: CommentService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('write')
    writeComment(@Body() comment: CommentInterface, @Request() req) {
        return this.commentService.writeComment(comment, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('reply')
    replyOnComment(@Body() comment: commentToReply, @Request() req) {
        return this.commentService.replyOnComment(comment, req.user);
    }

    @Post('update')
    updateComment(@Body() comment: commentToUpdate) {
        return this.commentService.updateComment(comment);
    }

    @Post('getAll')
    getAllComment(@Body() post: PostInterface) {
        return this.commentService.getAllPostComments(post);
    }

    @Post('getAllReplies')
    getAllCommentReplies(@Body() comment: CommentInterface) {
        return this.commentService.getAllCommentReplies(comment);
    }

    @Post('delete')
    deleteComment(@Body() comment: CommentInterface) {
        return this.commentService.deleteComment(comment);
    }

}
