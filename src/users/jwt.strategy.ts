import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/repositories/user.entity";
import { UsersRepository } from "src/repositories/users.repository";
import { JwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {
        super({
            secretOrKey: 'privateSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload; 
        const user: User = await this.usersRepository.findOne({ username });

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }

}