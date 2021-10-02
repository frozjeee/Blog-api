import { Injectable, NestMiddleware } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { AuthService } from './auth.service';



@Injectable()
export class SessionMiddleware implements NestMiddleware {
  
  constructor(
    private redisService: RedisService,

  ) {}

  use(req: any, res: any, next: () => void) {
    const reqToken = req.headers['authorization'].split(' ')[1];
    const accessToken = this.redisService.get("access_token");
    return accessToken.subscribe((value: string) => {
      if (value == reqToken) return next();
      else {
        return res.status(403).json({message: "Bad Token"})
      }
    });
  }
}