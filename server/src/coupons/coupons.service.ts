// coupon.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

  async createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const createdCoupon = new this.couponModel({ ...createCouponDto });
    return await createdCoupon.save();
  }

  async getAllCoupons(): Promise<Coupon[]> {
    return await this.couponModel.find().exec();
  }

  async getCouponById(id: string): Promise<Coupon> {
    return await this.couponModel.findById(id).exec();
  }

  async updateCoupon(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    return await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec();
  }

  async deleteCoupon(id: string): Promise<Coupon> {
    return await this.couponModel.findOneAndDelete({id}).exec();
  }
}
