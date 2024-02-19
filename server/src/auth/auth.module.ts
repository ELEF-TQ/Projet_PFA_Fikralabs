import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; 
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import 'dotenv/config'; // to resolve the .env file loading variables problem

@Module({
  imports: [
    UsersModule, 
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, //process.env.JWT_SECRET,pozihfkdsfjkc
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
