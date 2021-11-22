import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users as UserEntity } from 'src/entity/users.entity';
import { SearchModule } from 'src/search/search.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSearchService } from './userSearch.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SearchModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserSearchService],
  exports: [UserModule]
})
export class UserModule {}
