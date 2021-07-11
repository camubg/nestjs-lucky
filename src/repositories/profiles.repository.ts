import { EntityRepository, Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { Profile } from "./entities/profile.entity";
import { User } from "./entities/user.entity";

@EntityRepository(Profile)
export class ProfilesRepository extends Repository<Profile> {

    async createProfile(name: string, user: User, address: Address ){
        const newProfile = this.create({
            name, 
            user,
            address
        })

        await this.save(newProfile);
        return newProfile;
    }

}