import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  IsAlphanumeric,
} from 'class-validator';
import { CityExists } from '../validation/city-exists.validator';
import { UserUnique } from '../validation/user-unique.validator';

export class UserSignUpDTO {
  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  @IsAlphanumeric()
  @UserUnique()
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
  @CityExists()
  cityId: number;
}
