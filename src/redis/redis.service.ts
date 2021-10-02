import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { from } from 'rxjs';

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
      ) {}
    
      get(key: string) {
        return from(this.cacheManager.get(key));
      }
      set(key: string, value: string, ttl: number) {
        return from(this.cacheManager.set(key, value, { ttl: ttl }));;
      }
      del(key: any) {
        return from(this.cacheManager.del(key));
      }
}
