import { Controller, Post, Body, Get, Header, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    addUser(
        @Body('username') username: string, 
        @Body('password') password: string, 
        @Body('name') name: string, 
        @Body('anddres') address: string, 
        @Body('cityId') cityId: string
        ) {
        const generatedId = this.usersService.addUser(username, password, name, address, cityId);
        return { id: generatedId };
    }

    @Post('login')
    loginUser(
        @Body('username') username: string, 
        @Body('password') password: string, 
        ) {
        const generatedJwtToken = this.usersService.loginUser(username, password);
        return { jwtToken: generatedJwtToken };
    }

    @Get(':id')
    getUser(
        @Param('id') userId: string
        ) {
        return this.usersService.getUser(userId, "token");
    }

}

