import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { deletePostDto, findPostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { PostInterface } from './interface/post.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('post')
export class PostController {
    
    constructor(private readonly PostService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost(@Body() payload: PostInterface, @Request() req): Observable<PostInterface> {
        return this.PostService.createPost(payload, req.user);
    }

    @Post('find')
    findOnePost(@Body() payload: findPostDto): Observable<PostInterface[]> {
        return this.PostService.findOne(payload);
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('delete')
    // deletePost(@Body() payload: deletePostDto): Observable<string> {
    //     return this.PostService.remove(payload);
    // }
}
