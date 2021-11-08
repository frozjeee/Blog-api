import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { from } from 'rxjs';
import { UserSearchBody } from './interface/UserSearchBody.interface';
import { UserSearchResult } from './interface/UserSearchResult.interface';
import { User } from './user.class';

@Injectable()
export class UserSearchService {
    index = "user"
    constructor(
        private readonly elasticSearchService: ElasticsearchService
      ) {}

      indexUser(user: User) {
        return from(this.elasticSearchService.index<UserSearchResult, UserSearchBody>({
            index: this.index,
              body: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                registered_at: user.registered_at,
              }
            }))
      }

      async search(text: string) {
        const { body } = await this.elasticSearchService.search<UserSearchResult>({
          index: this.index,
          body: {
            query: {
              multi_match: {
                query: text,
                fields: ["email", "name"]
              }
            }
          }
        })
        const hits = body.hits.hits;
        return hits.map((item) => item._source);
      }
  
      async getAllUsers() {
        const { body } = await this.elasticSearchService.search<UserSearchResult>({
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
  
      deleteDoc(userId: number) {
        from(this.elasticSearchService.deleteByQuery({
          index: this.index,
          body: {
            query: {
              match: {
                id: userId
              }
            }
          } 
        })
        )
      }
}
