import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    private logger = new Logger('UsersRepository');

    async createUser(username: string, password: string): Promise<User>{

        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);

        const newUser = this.create({
            username,
            password: hashedPwd
        })

        await this.save(newUser);
        this.logger.log(`${newUser.username} was saved as new user`);
        return newUser;
    }

    async isUsernameUnique(username:string): Promise<boolean> {
        const found = await this.createQueryBuilder("user")
        .select(['user.id', 'user.username', 'user.password']) 
        .where("user.username = :username", { username: username }).getOne();
        
        return !found;
    }

    async deleteUser(newUser: User): Promise<void> {
        const found = await this.findOne(newUser);
        if(found){
            this.delete(found);
        }
    }

}