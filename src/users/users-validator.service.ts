import { BadRequestException, Injectable } from "@nestjs/common";
import { min } from "rxjs";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";

@Injectable()
export class UsersValidator {

    validateAuthCredentials(authCredentialsDTO: AuthCredentialsDTO) {
        this.authCredentialsDTONotNull(authCredentialsDTO);
        this.authCredentialsDTOIsString(authCredentialsDTO);
        this.authCredentialsDTOValidLength(authCredentialsDTO);
    }
    
    validateUserSignUp(userSignUpDTO: UserSignUpDTO) {
        this.userSignUpDTONotNull(userSignUpDTO);
        this.userSignUpDTOIsString(userSignUpDTO);
        this.userSignUpDTOValidLength(userSignUpDTO);
    }

    private authCredentialsDTOValidLength(authCredentialsDTO: AuthCredentialsDTO) {
        this.validateUsernameLength(authCredentialsDTO.username);
        this.validatePasswordLength(authCredentialsDTO.password);
    }

    private validatePasswordLength(password: String) {
        var minLength = 8;
        var maxLength = 20;
        if (password.length < minLength) {
            throw new BadRequestException(`Password can't have less than "${minLength}" characters`);
        } else if (password.length > 20) {
            throw new BadRequestException(`Password can't have more than "${maxLength}" characters`);
        }
    }
    
    private validateUsernameLength(username: String) {
        var minLength = 4;
        var maxLength = 20;
        if (username.length < minLength) {
            throw new BadRequestException(`Username can't have less than "${minLength}" characters`);
        } else if (username.length > 20) {
            throw new BadRequestException(`Username can't have more than "${maxLength}" characters`);
        }
    }

    private authCredentialsDTOIsString(authCredentialsDTO: AuthCredentialsDTO) {
        
        this.validatePasswordCharacters(authCredentialsDTO.password);
        this.validateUsernameCharacters(authCredentialsDTO.password);
    }

    private authCredentialsDTONotNull(authCredentialsDTO: AuthCredentialsDTO) {
        if (!authCredentialsDTO ||
            !authCredentialsDTO.username ||
            !authCredentialsDTO.password ) {
            throw new BadRequestException("Request's values can't be null");
        }
    }

    private userSignUpDTOValidLength(userSignUpDTO: UserSignUpDTO) {
        var minLength = 4;
        var maxLength = 20;
        var uuidLength = 36;
        
        this.validateUsernameLength(userSignUpDTO.username);
        this.validatePasswordLength(userSignUpDTO.password);

        if(userSignUpDTO.name.length > 20){
            throw new BadRequestException(`Name can't have more than "${maxLength}" characters`);
        }

        if(userSignUpDTO.address.length < minLength ){
            throw new BadRequestException(`Address can't have less than "${minLength}" characters`);
        } else if(userSignUpDTO.address.length > 20){
            throw new BadRequestException(`Address can't have more than "${maxLength}" characters`);
        }

        if(userSignUpDTO.cityId.length == uuidLength ){
            throw new BadRequestException(`CityId is invalid`);
        }
    }

    private userSignUpDTOIsString(userSignUpDTO: UserSignUpDTO) {
        
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var formatWithSpace = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        
        this.validatePasswordCharacters(userSignUpDTO.password);
        this.validateUsernameCharacters(userSignUpDTO.password);
        
        if(format.test(userSignUpDTO.cityId)){
            throw new BadRequestException("CityId can't have special characters");
        }
        if(formatWithSpace.test(userSignUpDTO.address)){
            throw new BadRequestException("Address can't have special characters");
        }
        if(format.test(userSignUpDTO.name)){
            throw new BadRequestException("Username can't have special characters");
        }
    }

    private userSignUpDTONotNull(userSignUpDTO: UserSignUpDTO) {
        if (!userSignUpDTO ||
            !userSignUpDTO.address ||
            !userSignUpDTO.cityId ||
            !userSignUpDTO.name ||
            !userSignUpDTO.password ||
            !userSignUpDTO.username) {
            throw new BadRequestException("Request's values can't be null");
        }
    }

    private validatePasswordCharacters(password: string) {
        
        var strongPasswordFormat = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if(strongPasswordFormat.test(password)){
            throw new BadRequestException("Passwords will contain at least 1 upper case letter,"
            +" will contain at least 1 lower case letter and will contain at least 1 number or special character");
        }
    }
    
    private validateUsernameCharacters(username: string) {

        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(format.test(username)){
            throw new BadRequestException("Username can't have special characters");
        }
    }
}