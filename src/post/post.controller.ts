import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { deletePostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { PostInterface } from './interface/post.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostSearchService } from './postSearch.service';


@Controller('post')
export class PostController {
    
    constructor(
        private readonly postService: PostService,
        private readonly postSearchService: PostSearchService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost(@Body() payload: PostInterface, @Request() req): Observable<PostInterface> {
        return this.postService.createPost(payload, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    deletePost(@Body() payload: deletePostDto): Observable<object> {
        return this.postService.deletePost(payload);
    }

    @Get('search')
    Search(@Query() search: object) {
        if (search["search"]) {
            return this.postSearchService.search(search["search"]);
          }
          return this.postSearchService.getAllPosts();
    }

}
