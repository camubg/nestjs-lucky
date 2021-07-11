import { ConflictException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
import { JwtPayload } from "./model/jwt-payload.interface";
import { UserProfile } from "./model/user-profile.model";
import { AddressProfile } from "./model/address-profile.model";
import { Profile } from "src/repositories/entities/profile.entity";
import { Address } from "src/repositories/entities/address.entity";

@Injectable()
export class UsersService {

    private logger = new Logger('UsersService');

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
        
        //this.usersValidator.validateUserSignUp(userSignUpDTO);

        if(await this.usersRepository.isUsernameUnique(userSignUpDTO.username) == false){
            this.logger.log(`${userSignUpDTO.username} is already taken`);
            throw new ConflictException(`${userSignUpDTO.username} is already taken`);
        }

        const city = await this.getCityById(userSignUpDTO.cityId);
        
        const newUser: User = null;
        const newAddress: Address = null; 
        const newProfile: Profile = null;
    
        try {
            const newUser = await this.usersRepository.createUser(userSignUpDTO.username, userSignUpDTO.password);
            const newAddress = await this.addressesRepository.createAddress(userSignUpDTO.address, city);
            const newProfile = await this.profilesRepository.createProfile(userSignUpDTO.name, newUser, newAddress);
        } catch(err) {

            this.rollbackAnyChanges(newUser, newAddress, newProfile);

            this.logger.error(`Error creating new user: ${userSignUpDTO.username} with error message:` +
            `${err.message} - ${err.detail}`);
            throw new InternalServerErrorException("Something got wrong");
        }
        
    }

    private async rollbackAnyChanges(newUser: User, newAddress: Address, newProfile: Profile) {
        await this.usersRepository.deleteUser(newUser);
        await this.addressesRepository.deleteAddress(newAddress);
        await this.profilesRepository.deleteProfile(newProfile);
    }

    async getProfileUser(userFound: User):  Promise<UserProfile>  {
        
        const profile = await this.profilesRepository.findOne({ where: { user: userFound } });

        if(!profile){
            this.logger.error(`Profile for user: ${userFound.username} not found`)
            throw new NotFoundException(`Profile not found`);
        }

        console.log(profile);
        const addressToReturn = new AddressProfile(
            profile.address.street, 
            profile.address.city.name, 
            profile.address.city.country.name
            ); 
       
        return new UserProfile(profile.id, profile.name, addressToReturn);
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

    private async getCityById(id: number): Promise<City> {
        
        const found = await this.citiesRepository.findOne({ id });
        if(!found){
            throw new NotFoundException(`City with id "${id}" not found`);
        }
        return found;
    }

}