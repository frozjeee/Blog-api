import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
          return {
              store: redisStore,
              host: 'localhost',
              port:  6379,
              ttl: 60 * 3600 * 1000,
          };
      },
  }),
  ],
  providers: [RedisService],
  exports: [RedisService, RedisModule, CacheModule]
})
export class RedisModule {}
