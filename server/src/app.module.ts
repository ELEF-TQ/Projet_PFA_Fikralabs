import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PompistesModule } from './pompistes/pompistes.module';
import { AdminModule } from './admin/admin.module';
import { Module } from '@nestjs/common';



@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vivo_energy'), ServicesModule, AuthModule, UsersModule, PompistesModule, AdminModule],
  
})
export class AppModule {}
