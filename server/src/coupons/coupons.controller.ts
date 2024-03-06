import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}


   /// ___ PUBLIC ROUTES :
  @Get()
  async getAllCoupons(): Promise<Coupon[]> {
    return await this.couponsService.getAllCoupons();
  }

  @Get(':id')
  async getCouponById(@Param('id') id: string): Promise<Coupon> {
    return await this.couponsService.getCouponById(id);
  }


  /// ___ ADMIN ROUTES :
  @Post()
  async createCoupon(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponsService.createCoupon(createCouponDto);
  }


  @Put(':id')
  async updateCoupon(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<Coupon> {
    return await this.couponsService.updateCoupon(id, updateCouponDto);
  }

  @Delete(':id')
  async deleteCoupon(@Param('id') id: string): Promise<Coupon> {
    return await this.couponsService.deleteCoupon(id);
  }
  


  /// ___ CLIENT ROUTES :
  @Get('reserve/:id')
  async reserveCouponById(@Param('id') id: string): Promise<Coupon> {
    return await this.couponsService.reserveCouponById(id);
  }
 


}
