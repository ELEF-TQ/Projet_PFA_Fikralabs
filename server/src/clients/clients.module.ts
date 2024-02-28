import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, UserSchema } from './schemas/client.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Client.name,
      schema: UserSchema
    }
  ])],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
