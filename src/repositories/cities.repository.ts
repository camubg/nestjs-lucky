import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { City } from "./city.entity";
import { CountriesRepository } from "./countries.repository";
import { Country } from "./country.entity";

@EntityRepository(City)
export class CitiesRepository extends Repository<City> {

    constructor(
        @InjectRepository(CountriesRepository)
        private countriesRepository: CountriesRepository
        ) {
        super();
        //this.initTable();
    }

    async createCity(name: string, country: Country){
        const newCity = this.create({
            name,
            country
        })

        await this.save(newCity);
        return newCity;
    }

    private async initTable() {
        const us = await this.countriesRepository.getCountryByName("United States");
        const arg = await this.countriesRepository.getCountryByName("Argentina");
        this.createCity("Washington", us);
        this.createCity("Buenos Aires", arg);
    }

}