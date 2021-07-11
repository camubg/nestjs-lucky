import { IsNotEmpty, Length, IsString, IsAlphanumeric } from 'class-validator';

export class AuthCredentialsDTO {
  @Length(4, 20)
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
