import { ClientsService } from './../clients/clients.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ReserveCouponDto } from './dto/reserve-coupon.dto';
import { Client } from 'src/clients/schemas/client.schema';
@Injectable()
export class CouponsService {
  
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<Coupon> ,
    private readonly clientService: ClientsService,
    ) {}

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

  async getCouponByCode(code: string): Promise<Coupon> {
    return await this.couponModel.findOne({code}).exec();
  }

  async updateCoupon(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    return await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec();
  }

  async deleteCoupon(id: string): Promise<Coupon> {
    return await this.couponModel.findOneAndDelete({id}).exec();
  }

  async reserveCouponById(reserveCouponDto: ReserveCouponDto): Promise<Coupon> {
    const client = await this.clientService.findOne(reserveCouponDto.clientId);
    const coupon = await this.getCouponByCode(reserveCouponDto.couponId);

    if (!client || !coupon) {
      throw new NotFoundException('Client ou coupon non trouvé');
    }

    if (client.score < coupon.score) {
      throw new HttpException('Le client n\'a pas suffisamment de points pour réserver ce coupon', HttpStatus.BAD_REQUEST);
    }

    if (coupon.nbrDisponible <= 0) {
      throw new HttpException('Coupon non disponible', HttpStatus.BAD_REQUEST);
    }

    coupon.nbrDisponible -= 1;

    await coupon.save();
    await this.clientService.updateClientCoupons(client, coupon);

    return coupon;
  }

}
