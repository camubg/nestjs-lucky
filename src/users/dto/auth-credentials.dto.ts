import { IsNotEmpty, Length, IsString } from 'class-validator'

export class AuthCredentialsDTO {
    
    @Length(4, 20)
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
   
}