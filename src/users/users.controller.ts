import { Controller, Post, Body, Get, Header, Param } from "@nestjs/common";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
        ) {}

    @Post()
    addUser(
        @Body() userSignUpDTO: UserSignUpDTO
        ) {
        const generatedId = this.usersService.addUser(userSignUpDTO);
        return { id: generatedId };
    }

    @Post('login')
    loginUser(
        @Body() authCredentialsDTO: AuthCredentialsDTO) {
        const generatedJwtToken = this.usersService.loginUser(authCredentialsDTO);
        return { jwtToken: generatedJwtToken };
    }

    @Get('profile')
    getUser() {
        return this.usersService.getUser("token");
    }

}

