import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vivo_energy'), ServicesModule, AuthModule, UsersModule],
  
})
export class AppModule {}
