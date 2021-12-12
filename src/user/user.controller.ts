import { Controller, Post, Body, Get, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.class';
import { UserService } from './user.service';
import { UserSearchService } from './userSearch.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userSearchService: UserSearchService,
        private readonly userService: UserService
        ){}

    @Get('search')
    Search(@Query() search: object) {
        if (search["search"]) {
            return this.userSearchService.search(search["search"]);
            }
            return this.userSearchService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    Delete(@Request() req) {
        return this.userService.deleteUser(req.user);
    }

}
