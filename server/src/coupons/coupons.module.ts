import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './Schemas/coupon.schema';
import { ClientsModule } from 'src/clients/clients.module';
import { Client, ClientSchema } from 'src/clients/schemas/client.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Coupon.name,schema: CouponSchema},
    {name: Client.name,schema: ClientSchema}
  ]),
    ClientsModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports:[CouponsService]
})
export class CouponsModule {}
