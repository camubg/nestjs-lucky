import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Logger,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../repositories/entities/user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserSignUpDTO } from './dto/user-sign-up.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UserProfile } from './model/user-profile.model';
import { UsersService } from './users.service';
import { CustomValidationPipe } from './validation/validation.pipe';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new CustomValidationPipe())
  addUser(@Body() userSignUpDTO: UserSignUpDTO): Promise<void> {
    this.logger.log(`User ${userSignUpDTO.username} is trying to sign up`);
    return this.usersService.addUser(userSignUpDTO);
  }

  @Post('login')
  @UsePipes(new CustomValidationPipe())
  loginUser(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
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
