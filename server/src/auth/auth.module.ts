import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ClientsModule } from '../clients/clients.module'; 
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import 'dotenv/config'; 
import { PompistesModule } from 'src/pompistes/pompistes.module';

@Module({
  imports: [
    ClientsModule, 
    AdminModule,
    PompistesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
