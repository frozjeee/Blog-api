import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionMiddleware } from 'src/auth/session.middleware';
import { Category } from 'src/entity/category.entity';
import { Post } from 'src/entity/post.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
    TypeOrmModule.forFeature([Post]), 
    RedisModule
    ],
    providers: [PostService, RedisService],
    controllers: [PostController],
})
export class PostModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(SessionMiddleware)
          .exclude(
              {path: 'post/find', method: RequestMethod.POST}
          )
          .forRoutes(PostController);
    }
}
