import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { PostModule } from 'src/post/post.module';
import { RedisModule } from 'src/redis/redis.module';
import { SearchModule } from 'src/search/search.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.postgres.env',
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: Number(configService.get('POSTGRES_PORT')),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
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
        inject: [ConfigService],
    }),
  AuthModule, PostModule, RedisModule, SearchModule, CategoryModule

],
})
export class AppModule {}
