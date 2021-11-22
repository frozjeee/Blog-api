import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users as UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}


    adminAddBalance(user: UserEntity, amount: number){
        user.balance += amount;
        return this.userRepository.save(user);
    }
}