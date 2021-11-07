import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
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
    SearchModule,
    CategoryModule
    ],
    providers: [PostService, RedisService, PostSearchService],
    controllers: [PostController],
})
export class PostModule {}
