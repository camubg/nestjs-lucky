import { Injectable } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UsersService {

    private users: User[] = [];

    addUser(username: string, password: string, name: string, address: string, cityId: string){
        //todo
        throw new Error("Method not implemented.");
    }

    getUser(id: any, token: string) {
        //todo
        throw new Error("Method not implemented.");
    }
    
    loginUser(username: string, password: string) {
        //todo
        throw new Error("Method not implemented.");
    }

}