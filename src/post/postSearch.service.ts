import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { from } from 'rxjs';
import { PostInterface } from './interface/post.interface';
import { PostSearchBody } from './interface/PostSearchBody.interface';
import { PostSearchResult } from './interface/PostSearchResult.interface';

@Injectable()
export class PostSearchService {
    index = "post"
    constructor(
        private readonly elasticSearchService: ElasticsearchService
      ) {}

    indexPost(post: PostInterface) {
      return from(this.elasticSearchService.index<PostSearchResult, PostSearchBody>({
        index: this.index,
          body: {
            id: post.id,
            title: post.title,
            content: post.content,
            category: post.category,
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
              query: text,
              fields: ["title", "content"]
            }
          }
        }
      })
      const hits = body.hits.hits;
      return hits.map((item) => item._source);
    }

    async getAllPosts() {
      const { body } = await this.elasticSearchService.search<PostSearchResult>({
        index: this.index,
        body: {
          query: {
            match_all: {}
          }
        }
      })
      const hits = body.hits.hits;
      return hits.map((item) => item._source);
    }

    deleteDoc(postId: number) {
      from(this.elasticSearchService.deleteByQuery({
        index: this.index,
        body: {
          query: {
            match: {
              id: postId
            }
          }
        } 
      })
      )
    }
  }