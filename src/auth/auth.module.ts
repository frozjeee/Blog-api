import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity} from 'src/entity/user.entity';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { SearchModule } from 'src/search/search.module';
import { UserModule } from 'src/user/user.module';
import { UserSearchService } from 'src/user/userSearch.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
        secret: jwtConstants.accessSecret,
      }),
    RedisModule,
    UserModule,
    SearchModule,
],
    providers: [AuthService, JwtStrategy, RedisService, UserSearchService],
    controllers: [AuthController],
    exports: [AuthService]  
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .forRoutes({ path: 'auth/create', method: RequestMethod.POST });
    }
}
