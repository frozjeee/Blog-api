import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Users as UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const userExists = await this.userRepository.findOne({ name: req.body.name });
    if (userExists) {
      res.status(409).json({ message: 'User already exists'});
      return;
    }
    next();

  }
}
