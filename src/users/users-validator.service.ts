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
        var minLength = 4;
        var maxLength = 20;
        
        if(authCredentialsDTO.username.length < minLength ){
            throw new BadRequestException(`Username can't have less than "${minLength}" characters`);
        } else if(authCredentialsDTO.username.length > 20){
            throw new BadRequestException(`Username can't have more than "${maxLength}" characters`);
        }
    }
    
    private authCredentialsDTOIsString(authCredentialsDTO: AuthCredentialsDTO) {
        
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(format.test(authCredentialsDTO.username)){
            throw new BadRequestException("Username can't have special characters");
        }
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
        
        if(userSignUpDTO.username.length < minLength ){
            throw new BadRequestException(`Username can't have less than "${minLength}" characters`);
        } else if(userSignUpDTO.username.length > 20){
            throw new BadRequestException(`Username can't have more than "${maxLength}" characters`);
        }

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
        
        if(format.test(userSignUpDTO.username)){
            throw new BadRequestException("Username can't have special characters");
        }
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
}