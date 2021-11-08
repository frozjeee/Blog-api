import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { User } from './user.class';
import { UserService } from './user.service';
import { UserSearchService } from './userSearch.service';

@Controller('users')
export class UserController {

    constructor(
        private readonly userSearchService: UserSearchService,
        ){}

    @Get('search')
    Search(@Query() search: object) {
        if (search["search"]) {
            return this.userSearchService.search(search["search"]);
            }
            return this.userSearchService.getAllUsers();
    }


}
