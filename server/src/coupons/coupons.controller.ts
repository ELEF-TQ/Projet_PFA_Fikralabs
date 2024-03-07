import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, Patch, NotFoundException } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon } from './Schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { DeleteMultipleDto } from './dto/delete-multiple.dto';
import { ReserveCouponDto } from './dto/reserve-coupon.dto';

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
  @UsePipes(ValidationPipe)
  async createCoupon(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponsService.createCoupon(createCouponDto);
  }


  @Patch(':id')
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

  @Post('/destroy')
  async deleteMultiple(@Body() deleteMultipleDto: DeleteMultipleDto): Promise<Coupon[]> {
    const { ids } = deleteMultipleDto;
    const deletedCoupons = await this.couponsService.destroy(ids);
    if(deletedCoupons.length === 0){
      throw new NotFoundException("Aucun coupon n'est supprimmé")
    }else{
      return deletedCoupons;
    }
  }
  


  /// ___ CLIENT ROUTES :
  @Post('reserve')
  async reserveCouponById(
    @Body() reserveCouponDto: ReserveCouponDto
  ): Promise<Coupon> {
    return await this.couponsService.reserveCouponById(reserveCouponDto);
  }
  
 


}
