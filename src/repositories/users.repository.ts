import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(username: string, password: string){
        const newUser = this.create({
            username,
            password
        })

        await this.save(newUser);
        return newUser;
    }

}