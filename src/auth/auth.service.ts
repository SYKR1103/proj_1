import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HttpException, HttpStatus} from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './interfaces/TokenPayloadInterface';


@Injectable()
export class AuthService {


  constructor(
    private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService
  ) {}

    //SIGNUP
    async createU(c:CreateUserDto) {
      try{return await this.userService.createU(c)} 
      catch(e) {
        console.log(e)
        throw new HttpException('xxxx', HttpStatus.INTERNAL_SERVER_ERROR)
      }
      
    }


    //LOGIN
    async loginU(l:LoginUserDto) {
      const user = await this.userService.findUserByEmail(l.email)
      const isMatched = await user.checkPassword(l.password)
      if (!isMatched) throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
      return user
    }

    async generateAccessToken(userid : string) {
     
      const payload : TokenPayloadInterface = {userid} 
      const token = this.jwtService.sign(payload, {


        secret : this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn : this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),


      })
      return token
    }


}