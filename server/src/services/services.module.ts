import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ClientsModule } from 'src/clients/clients.module';
import { ReservationService, ReservationServiceSchema } from './schemas/reservationService.schema';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Service.name,
      schema: ServiceSchema
    },
    {
      name: ReservationService.name,
      schema: ReservationServiceSchema
    }
  ]),
  ClientsModule, CouponsModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService]
})
export class ServicesModule {}
