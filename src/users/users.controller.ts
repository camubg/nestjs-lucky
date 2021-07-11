import { Controller, Post, Body, Get, Header, Param, UseGuards, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/repositories/entities/user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";
import { GetUser } from "./get-user.decorator";
import { UserProfile } from "./model/user-profile.model";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    private logger = new Logger('UsersController');

    constructor(
        private readonly usersService: UsersService
        ) {}

    @Post()
    addUser(
        @Body() userSignUpDTO: UserSignUpDTO
        ): Promise<void> {
        
            this.logger.log(`User ${userSignUpDTO.username} is trying to sign up`); 
            return this.usersService.addUser(userSignUpDTO);
    }

    @Post('login')
    loginUser(
        @Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
            this.logger.log(`User ${authCredentialsDTO.username} is trying to log in`); 
            const generatedJwtToken = this.usersService.loginUser(authCredentialsDTO);
            return generatedJwtToken;
    }

    @Get('profile')
    @UseGuards(AuthGuard())
    getProfileUser(@GetUser() user: User): Promise<UserProfile> {
            this.logger.log(`User ${user.username} retrieving profile`);
            return this.usersService.getProfileUser(user);
    }

}

