import { Controller, Post, Body } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) {}

}
