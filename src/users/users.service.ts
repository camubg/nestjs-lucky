import { Inject, Injectable, NotFoundException, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesRepository } from "src/repositories/addresses.repository";
import { CitiesRepository } from "src/repositories/cities.repository";
import { City } from "src/repositories/city.entity";
import { ProfilesRepository } from "src/repositories/profiles.repository";
import { User } from "src/repositories/user.entity";
import { UsersRepository } from "src/repositories/users.repository";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";
import { UsersValidator } from "./users-validator.service";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        @InjectRepository(AddressesRepository)
        private addressesRepository: AddressesRepository,
        @InjectRepository(CitiesRepository)
        private citiesRepository: CitiesRepository,
        @InjectRepository(ProfilesRepository)
        private profilesRepository: ProfilesRepository,
        @Inject(UsersValidator)
        private usersValidator: UsersValidator
        ) {}
        

    async addUser(userSignUpDTO: UserSignUpDTO){
        
        this.usersValidator.validateUserSignUp(userSignUpDTO);
        
        const newUser = await this.usersRepository.createUser(userSignUpDTO.username, userSignUpDTO.password);
        const city = await this.getCityById(userSignUpDTO.cityId);
        const newAddress = await this.addressesRepository.createAddress(userSignUpDTO.address, city);
        this.profilesRepository.createProfile(userSignUpDTO.name, newUser, newAddress);
        return userSignUpDTO.name;
    }


    getUser(token: string) {

        //todo
        throw new Error("Method not implemented.");
    }
    
    async loginUser(authCredentialsDTO: AuthCredentialsDTO) {
    
        this.usersValidator.validateAuthCredentials(authCredentialsDTO);
        const {username, password} = authCredentialsDTO;

    }

    private async getUserById(id: string): Promise<User> {
        
        const found = await this.usersRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`User with id "${id}" not found`);
        }
        return found;
    }

    private async getCityById(id: string): Promise<City> {
        
        const found = await this.citiesRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`City with id "${id}" not found`);
        }
        return found;
    }



}