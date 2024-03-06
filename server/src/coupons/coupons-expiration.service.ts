// coupon-expiration.service.ts

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from './Schemas/coupon.schema';

@Injectable()
export class CouponExpirationService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

  @Cron('0 0 * * *') 
  async handleCouponExpiration() {
    const now = new Date();
    await this.couponModel.deleteMany({ dateExpiration: { $lte: now } }).exec();
  }
}
