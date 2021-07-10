import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(username: string, password: string){

        this.validateUsernameIsUnique(username);

        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);

        const newUser = this.create({
            username,
            password: hashedPwd
        })

        await this.save(newUser);
        return newUser;
    }

    private async validateUsernameIsUnique(username:string){
        const found = await this.createQueryBuilder("user")
        .select(['user.id', 'user.username', 'user.password']) 
        .where("user.username = :username", { username: username }).getOne();
        
        if(found){
            throw new ConflictException(`${username} is already taken`);
        }
    }

}