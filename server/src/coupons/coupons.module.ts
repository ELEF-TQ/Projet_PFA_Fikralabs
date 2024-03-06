import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './Schemas/coupon.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Coupon.name,
      schema: CouponSchema
    }
  ])],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
