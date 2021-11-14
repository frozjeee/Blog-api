import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CommentInterface } from './interface/comment.interface';

@Controller('comment')
export class CommentController {

    constructor(
        private readonly commentService: CommentService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('write')
    createPost(@Body() comment: CommentInterface, @Request() req) {
        return this.commentService.writeComment(comment, req.user);
    }


}
