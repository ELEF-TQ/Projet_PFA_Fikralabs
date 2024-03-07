// coupon.service.ts

import { Delete, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { generateCouponCode } from './utils/generateCouponCode';

@Injectable()
export class CouponsService {
  
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

  async createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
    let couponCode: string; 
    let isUniqueCode = false;
    while(!isUniqueCode){
      couponCode = generateCouponCode();
      const isCouponExist = await this.couponModel.findOne({ code: couponCode }).exec();
      if(!isCouponExist){
        isUniqueCode = true;
      }
    }
    const dateActuelle = new Date(2024, 11, 5);
    console.log(dateActuelle.toISOString());
    
    const createdCoupon = new this.couponModel({ ...createCouponDto, code: couponCode });
    const savedCoupon = await createdCoupon.save();
    if(savedCoupon){
      return savedCoupon;
    }else{
      throw new HttpException("Un erreur est survenu lors de la creation du coupon", HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCoupons(): Promise<Coupon[]> {
    const allCoupons = await this.couponModel.find().exec();
    if(allCoupons){
      return allCoupons;
    }else{
      throw new HttpException("Pas de coupon pour le moment", HttpStatus.BAD_REQUEST);
    }
  }

  async getCouponById(id: string): Promise<Coupon> {
    return await this.couponModel.findById(id).exec();
  }

  async updateCoupon(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec();
    if(updateCouponDto){
      return updatedCoupon;
    }else{
      throw new HttpException("Un erreur est survenu lors de la mise à jour du coupon", HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCoupon(id: string): Promise<Coupon> {
    const deletedCoupon = await this.couponModel.findByIdAndDelete(id);
    if(deletedCoupon){
      return deletedCoupon;
    }else{
      throw new HttpException("Un erreur est survenu lors de la supression du coupon", HttpStatus.BAD_REQUEST);
    }
  }

  async destroy(ids: string[]): Promise<Coupon[]> {
    const deletedCoupons = await this.couponModel.find({ _id: { $in: ids } }).exec();
    await this.couponModel.deleteMany({ _id: { $in: ids } }).exec();
    return deletedCoupons;
  }

  reserveCouponById(id: string): Coupon | PromiseLike<Coupon> {
    throw new Error('Method not implemented.');
  }
}
