import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesRepository } from "src/repositories/addresses.repository";
import { CitiesRepository } from "src/repositories/cities.repository";
import { City } from "src/repositories/city.entity";
import { CountriesRepository } from "src/repositories/countries.repository";
import { ProfilesRepository } from "src/repositories/profiles.repository";
import { User } from "src/repositories/user.entity";
import { UsersRepository } from "src/repositories/users.repository";

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
        private profilesRepository: ProfilesRepository
        ) {}
        

    async addUser(username: string, password: string, name: string, address: string, cityId: string){
        
        const newUser = await this.usersRepository.createUser(username, password);
        const city = await this.getCityById(cityId);
        const newAddress = await this.addressesRepository.createAddress(address, city);
        this.profilesRepository.createProfile(name,  newUser, newAddress);
        return name;
    }

    getUser(token: string) {
        //todo
        throw new Error("Method not implemented.");
    }
    
    loginUser(username: string, password: string) {
        //todo
        throw new Error("Method not implemented.");
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