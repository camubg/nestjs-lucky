import { EntityRepository, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {
  async deleteAddress(newAddress: Address): Promise<void> {
    const found = await this.findOne(newAddress);
    if (found) {
      this.delete(found);
    }
  }

  async createAddress(street: string, city: City): Promise<Address> {
    const newAddress = this.create({
      street,
      city,
    });

    await this.save(newAddress);
    return newAddress;
  }
}
