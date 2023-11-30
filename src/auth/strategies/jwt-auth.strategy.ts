 

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { TokenPayloadInterface } from "../interfaces/TokenPayloadInterface";





@Injectable()

export class JwtAuthStrategy extends PassportStrategy(Strategy) {

    constructor (
        private readonly configService : ConfigService,
        private readonly userService : UserService
    ) {


        super({

            secretOrKey : configService.get("JWT_ACCESS_TOKEN_SECRET"),
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()

        })
    }


    async validate(payload : TokenPayloadInterface): Promise<User> {

        return await this.userService.findUserById(payload.userid)


    }

}
