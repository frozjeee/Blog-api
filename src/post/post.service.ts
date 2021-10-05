import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entity/post.entity';
import { deletePostDto, findPostDto } from './dto/post.dto';
import { PostInterface } from './interface/post.interface';
import { User } from 'src/user/user.class';
const randomstring = require('../../node_modules/randomstring/index.js');

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

    slugifyTitle(title: string): Observable<string> {
      return of(title.toLowerCase().replace(" ", "-") + "-" + randomstring.generate(12));
    }

  createPost(post: PostInterface, userPayload: User): Observable<PostInterface> {
    const { title } = post;
    return this.slugifyTitle(title).pipe(
      switchMap((slugifiedTitle: string) => {
        post.author = userPayload["user"];
        return from(
          this.postRepository.save({
            ...post,
            slug: slugifiedTitle,
            author: post.author
          })
        )
      })
      );
  }

  find(title: findPostDto): Observable<PostInterface[]> {
    return from(this.postRepository.find(title));
  }

  delete(slug: deletePostDto): Observable<object> {
    return from(this.postRepository.findOne(slug))
    .pipe(
      map((value: deletePostDto) => {
        if (value) {
          this.postRepository.delete(value["id"]);
          return {message: "Post deleted"};;
        }
        else {
          return {message: "Post not found"};
        }

      })
    );
    
  }

  
}