import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  IsAlphanumeric,
} from 'class-validator';
import { UserExists } from '../validation/user-exists.validator';

export class UserSignUpDTO {
  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  @UserExists()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 40)
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 100)
  cityId: number;
}
