import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesRepository } from "src/repositories/addresses.repository";
import { CitiesRepository } from "src/repositories/cities.repository";
import { City } from "src/repositories/entities/city.entity";
import { ProfilesRepository } from "src/repositories/profiles.repository";
import { User } from "src/repositories/entities/user.entity";
import { UsersRepository } from "src/repositories/users.repository";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { UserSignUpDTO } from "./dto/user-sign-up.dto";
import { UsersValidator } from "./users-validator.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { Profile } from "./model/profile.model";
import { Address } from "./model/address.model";

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
        private usersValidator: UsersValidator,
        private jwtService: JwtService
        ) {}
        

    async addUser(userSignUpDTO: UserSignUpDTO): Promise<void>{
        
        this.usersValidator.validateUserSignUp(userSignUpDTO);
    
        const newUser = await this.usersRepository.createUser(userSignUpDTO.username, userSignUpDTO.password);
        const city = await this.getCityById(userSignUpDTO.cityId);
        const newAddress = await this.addressesRepository.createAddress(userSignUpDTO.address, city);
        this.profilesRepository.createProfile(userSignUpDTO.name, newUser, newAddress);
    }


    async getProfileUser(userFound: User):  Promise<Profile>  {

        const profile = await this.profilesRepository.findOne({ where: { userFound } });

        if(!profile){
            //todo
            throw new NotFoundException(`Profile not found`);
        }

        const addressToReturn = new Address(
            profile.address.street, 
            profile.address.city.name, 
            profile.address.city.country.name
            ); 
       
        return new Profile(profile.id, profile.name, addressToReturn);
    }
    
    async loginUser(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    
        this.usersValidator.validateAuthCredentials(authCredentialsDTO);
        const {username, password} = authCredentialsDTO;

        const user = await this.usersRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }

        throw new UnauthorizedException(`Username or password is incorrect`);
    }

    private async getCityById(id: string): Promise<City> {
        
        const found = await this.citiesRepository.findOne({ id });
        if(!found){
            throw new NotFoundException(`City with id "${id}" not found`);
        }
        return found;
    }


}