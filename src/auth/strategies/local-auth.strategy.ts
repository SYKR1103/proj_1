 

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";





@Injectable()

export class LocalAuthStrategy extends PassportStrategy(Strategy) {

    constructor (
        private readonly authservice : AuthService
    ) {


        super({


            usernameField : 'email'

        })
    }


    async validate(email :string, password : string): Promise<User> {

        return await this.authservice.loginU({email, password})


    }

}
