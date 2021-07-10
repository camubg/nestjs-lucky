import { EntityRepository, Repository } from "typeorm";
import { Address } from "./address.entity";
import { City } from "./city.entity";


@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {

    async createAddress(street: string, city: City){
        const newCity = this.create({
            street, 
            city
        })

        await this.save(newCity);
        return newCity;
    }

}