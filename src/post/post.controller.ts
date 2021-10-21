import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { deletePostDto, findPostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { PostInterface } from './interface/post.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostSearchService } from './postSearch.service';


@Controller('post')
export class PostController {
    
    constructor(
        private readonly PostService: PostService,
        private readonly elasticSearchService: PostSearchService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost(@Body() payload: PostInterface, @Request() req): Observable<PostInterface> {
        return this.PostService.createPost(payload, req.user);
    }

    @Post('find')
    findPosts(@Body() payload: findPostDto): Observable<PostInterface[]> {
        return this.PostService.find(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    deletePost(@Body() payload: deletePostDto): Observable<object> {
        return this.PostService.delete(payload);
    }

    @Get('search')
    Search(@Query() search: string) {
        return this.elasticSearchService.search(search);
    }

}
