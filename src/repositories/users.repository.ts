import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(username: string, password: string){

        this.validateUsernameIsUnique(username);

        const newUser = this.create({
            username,
            password
        })

        await this.save(newUser);
        return newUser;
    }

    async validateUsernameIsUnique(username:string){
        const found = await this.createQueryBuilder("user")
        .select(['user.id', 'user.username', 'user.password']) 
        .where("user.username = :username", { username: username }).getOne();
        
        if(found){
            throw new BadRequestException(`${username} is already taken`);
        }
    }

}