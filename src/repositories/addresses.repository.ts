import { EntityRepository, Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { City } from "./entities/city.entity";


@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {

    async createAddress(street: string, city: City){
        console.log(city);
        const newCity = this.create({
            street, 
            city
        })

        await this.save(newCity);
        return newCity;
    }

}