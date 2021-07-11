import { EntityRepository, Repository } from "typeorm";
import { City } from "./entities/city.entity";
import { Country } from "./entities/country.entity";

@EntityRepository(City)
export class CitiesRepository extends Repository<City> {

    async createCity(name: string, country: Country){
        const newCity = this.create({
            name,
            country
        })

        await this.save(newCity);
        return newCity;
    }

}