import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entity/post.entity';
import { deletePostDto } from './dto/post.dto';
import { PostInterface } from './interface/post.interface';
import { User } from 'src/user/user.class';
import { PostSearchService } from './postSearch.service';
const randomstring = require('../../node_modules/randomstring/index.js');

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private postsSearchService: PostSearchService,
  ) {}

    slugifyTitle(title: string): Observable<string> {
      return of(title.toLowerCase().replace(" ", "-") + "-" + randomstring.generate(12));
    }

  createPost(post: PostInterface, userPayload: User): Observable<PostInterface> {
    const { title } = post;
    return this.slugifyTitle(title).pipe(
      switchMap((slugifiedTitle: string) => {
        post.author = userPayload["user"];
        console.log(post);
        return from(
          this.postRepository.save({
            ...post,
            slug: slugifiedTitle,
          })
        ).pipe(
          map((post: PostInterface) => {
            this.postsSearchService.indexPost(post);
            return post;
          })
        )
      })
      );
  }

  updatePost(post: PostInterface): Observable<any> {
    return from(this.postRepository.findOne(post["id"]))
    .pipe(
      map((value: PostInterface) => {
        if (value) {
          this.postRepository.update({id: post["id"]}, {likes: post.likes + 1});
          this.postsSearchService.indexPost(post);
          return post;
        }
        else {
          return {message: "Post not found"};
        }
      })
    );
  }


  deletePost(id: deletePostDto): Observable<object> {
    return from(this.postRepository.findOne(id))
    .pipe(
      map((value: deletePostDto) => {
        if (value) {
          this.postRepository.delete(value["id"]);
          this.postsSearchService.deleteDoc(value["id"]);
          return {message: "Post deleted"};;
        }
        else {
          return {message: "Post not found"};
        }

      })
    );
  }

  likePost(post: PostInterface): Observable<any> {
    return from(this.postRepository.findOne(post["id"]))
    .pipe(
      map((value: PostInterface) => {
        if (value) {
          this.postRepository.update(post["id"], {likes: post.likes + 1});
          this.postsSearchService.indexPost(post);
          return post;
        }
        else {
          return {message: "Post not found"};
        }
      })
    );
  }
  
}