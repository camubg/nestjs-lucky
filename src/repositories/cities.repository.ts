import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { City } from "./entities/city.entity";
import { CountriesRepository } from "./countries.repository";
import { Country } from "./entities/country.entity";

@EntityRepository(City)
export class CitiesRepository extends Repository<City> {

    constructor(
        @InjectRepository(CountriesRepository)
        private countriesRepository: CountriesRepository
        ) {
        super();
    }

    async createCity(name: string, country: Country){
        const newCity = this.create({
            name,
            country
        })

        await this.save(newCity);
        return newCity;
    }

}