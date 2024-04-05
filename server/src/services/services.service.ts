import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { ReservationService } from './schemas/reservationService.schema';
import { Model } from 'mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class ServicesService {

  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(ReservationService.name) private readonly reservationServiceModel: Model<ReservationService>,
    private readonly clientService: ClientsService,
    private readonly CouponService: CouponsService
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const createdService = new this.serviceModel(createServiceDto);
    return await createdService.save();
  }

  async findAll() {
    const allServices = await this.serviceModel.find().exec();
    if(allServices.length === 0){
      return allServices;
    }else{
      throw new NotFoundException("No Services Found");
    }
  }

  async findOne(id: string) {
    const service = await this.serviceModel.findById(id).exec();
    if(service){
      return service
    }else {
      throw new HttpException("No Service Matched this id", HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
   const updatedService = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
   if(updatedService){
    return updatedService;
   }else{
    throw new HttpException("No service to update with the provided id", HttpStatus.BAD_REQUEST);
   }
  }

  async remove(id: string) {
    const deletedService = await this.serviceModel.findByIdAndDelete(id).exec();
    if(deletedService){
      return deletedService;
    }else{
      throw new HttpException("No service to delete with the provided id", HttpStatus.BAD_REQUEST);
    }
  }

}
