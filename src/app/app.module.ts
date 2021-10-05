import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { RedisModule } from 'src/redis/redis.module';
import { SearchModule } from 'src/search/search.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database : 'nestjs',
    synchronize: true,
    logging: false,
    entities: [
      "dist/**/*.entity.js"
    ],
    migrations: [
      "src/migration/*.js"
    ],
    cli: {
      "entitiesDir": "dist/entity",
      "migrationsDir": "src/migration"
    }
  }),
  AuthModule, PostModule, RedisModule, SearchModule

],
})
export class AppModule {}
