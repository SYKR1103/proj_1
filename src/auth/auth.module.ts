import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';

@Module({
  imports : [UserModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtAuthStrategy],
})
export class AuthModule {}
