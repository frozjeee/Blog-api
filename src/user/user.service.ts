import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users as UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { User } from './user.class';


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

    deleteUser(userPayload: User){
        return from(this.userRepository.findOne(userPayload.id))
        .pipe(
            map((user) => {
                this.userRepository.remove(user);
                return({message: 'User deleted'});
            })
        )

    }
}