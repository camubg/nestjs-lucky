import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Country } from "./entities/country.entity";

@EntityRepository(Country)
export class CountriesRepository extends Repository<Country> {

    constructor() {
        super();
    }

    async createCountry(name: string){
        const newCountry = this.create({
            name
        })

        await this.save(newCountry);
        return newCountry;
    }

    async getCountryByName(name: string): Promise<Country> {
        
        const found = await this.createQueryBuilder("country")
        .select(['country.id', 'country.name']) 
        .where("country.name = :name", { name: name }).getOne();
        
        if(!found){
            throw new NotFoundException(`Country with name "${name}" not found`);
        }
        return found;
    }

}


