import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { SearchModule } from 'src/search/search.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSearchService } from './postSearch.service';

@Module({
    imports: [
    TypeOrmModule.forFeature([Post]), 
    RedisModule,
    SearchModule
    ],
    providers: [PostService, RedisService, PostSearchService],
    controllers: [PostController],
})
export class PostModule {}
