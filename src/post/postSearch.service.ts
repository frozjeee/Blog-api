import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post as PostEntity } from 'src/entity/post.entity';
import { PostSearchBody } from './interface/PostSearchBody.interface';
import { PostSearchResult } from './interface/PostSearchResult.interface';

@Injectable()
export class PostSearchService {
    index = "post"
    constructor(
        private readonly elasticSearchService: ElasticsearchService
      ) {}

    indexPost(post: PostEntity) {
      console.log(post);
      return from(this.elasticSearchService.index<PostSearchResult, PostSearchBody>({
        index: this.index,
          body: {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.author.id,
          }
        }))
      }

    async search(text: string) {
      const { body } = await this.elasticSearchService.search<PostSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query: text["search"],
              fields: ["title", "content"]
            }
          }
        }
      })
      const hits = body.hits.hits;
      return hits.map((item) => item._source);
    }
  }