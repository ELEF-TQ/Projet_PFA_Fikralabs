import { ClientsService } from './../clients/clients.service';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { generateCouponCode } from './utils/generateCouponCode';
import { ReserveCouponDto } from './dto/reserve-coupon.dto';
import { Client } from 'src/clients/schemas/client.schema';

@Injectable()
export class CouponsService {
  
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<Coupon> ,
    @InjectModel(Client.name) private clientModel: Model<Client> ,
    private readonly clientService: ClientsService,
  ) {}

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

  async findByCode(CouponCode: string){
    return await this.couponModel.findOne({code: CouponCode}).exec();;
  }

  async getCouponById(id: string): Promise<Coupon> {
    return await this.couponModel.findById(id).exec();
  }

  async getCouponByCode(code: string): Promise<Coupon> {
    return await this.couponModel.findOne({code}).exec();
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

  async reserveCouponById(reserveCouponDto: ReserveCouponDto): Promise<Coupon> {
     const client = await this.clientService.findOne(reserveCouponDto.clientId);
    const coupon = await this.couponModel.findById(reserveCouponDto.couponId);
    if (!coupon ) {
      throw new NotFoundException('coupon  non trouvé');
    }
 
    if (client.score < coupon.score) {
      throw new HttpException('Le client n\'a pas suffisamment de points pour réserver ce coupon', HttpStatus.BAD_REQUEST);
    }

    if (coupon.nbrDisponible <= 0) {
      throw new HttpException('Coupon non disponible', HttpStatus.BAD_REQUEST);
    }

    coupon.nbrDisponible -= 1;
    client.score -= coupon.score ;

    await coupon.save();
  
    await this.clientModel.findOneAndUpdate({ clientId: reserveCouponDto.clientId }, { score: client.score }); 
    await this.clientService.updateClientCoupons(client, coupon);
    return coupon;
  }

  async countCoupons(): Promise<number> {
    try {
      return await this.couponModel.countDocuments().exec();
    } catch (error) {
      throw new Error(`Erreur lors du comptage des coupons: ${error}`);
    }
  }

}
