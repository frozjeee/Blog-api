import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    
    @Post('register')
    createUser(@Body() payload: User) {
        return this.AuthService.register(payload);
    }

    @Post('login')
    login(@Body() payload: User) {
        return this.AuthService.login(payload);
    }
}