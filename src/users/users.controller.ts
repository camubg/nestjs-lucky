import { Controller, Post, Body, Get, Header, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/repositories/entities/user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";
import { GetUser } from "./get-user.decorator";
import { Profile } from "./model/profile.model";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
        ) {}

    @Post()
    addUser(
        @Body() userSignUpDTO: UserSignUpDTO
        ): Promise<void> {
        
            return this.usersService.addUser(userSignUpDTO);
    }

    @Post('login')
    loginUser(
        @Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
        const generatedJwtToken = this.usersService.loginUser(authCredentialsDTO);
        return generatedJwtToken;
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    getProfileUser(@GetUser() user: User): Promise<Profile> {
        return this.usersService.getProfileUser(user);
    }

    @Get()
    handshake() {
        return "hola";
    }


}

