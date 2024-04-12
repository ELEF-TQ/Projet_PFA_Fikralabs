import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { ReservationService } from './schemas/reservationService.schema';
import { Model } from 'mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { ReserveServiceDto } from './dto/reserve-service.dto';
import { generateReservationServiceCode } from './utils/generateReservationServiceCode';

@Injectable()
export class ServicesService {

  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    @InjectModel(ReservationService.name) private readonly reservationServiceModel: Model<ReservationService>,
    private readonly clientService: ClientsService,
    private readonly couponService: CouponsService
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const createdService = new this.serviceModel(createServiceDto);
    return await createdService.save();
  }

  async findAll() {
    return await this.serviceModel.find().exec();
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

  async reserverService(reserveServiceDto: ReserveServiceDto){
    const {clientId, serviceId, couponCode, dateReservation, heureReservation, ville, adresse} = reserveServiceDto;
    const client = await this.clientService.findOne(clientId);
    const service = await this.findOne(serviceId);
    let reservationServiceCode: string; 
    let isUniqueCode = false;
    let priceAfterDiscount: number;

    if(!client || !service){
      throw new HttpException("No service or client found with the provided ids", HttpStatus.BAD_REQUEST);
    }

    // Convertir heureReservation en millisecondes
      // const heureReservationInMilliseconds = new Date(heureReservation).getTime();
    // Calculate the nearby time range
      // const nearbyTimeRangeStart = new Date(heureReservationInMilliseconds - 30 * 60000);
      // const nearbyTimeRangeEnd = new Date(heureReservationInMilliseconds + 30 * 60000);

    // Vérifier si une réservation existe déjà pour le même service à la même date et à la même heure
    const existingReservation = await this.reservationServiceModel.findOne({
      service: serviceId,
      dateReservation,
      heureReservation,
      ville,
      adresse
    });

    if (existingReservation) {
      throw new HttpException("Une réservation pour ce service existe déjà à la date, l'heure et le lieu spécifiés", HttpStatus.BAD_REQUEST);
    }

    // Vérifier si une réservation existe déjà pour le même service à la même date et à une heure proche
      // const nearbyReservation = await this.reservationServiceModel.findOne({
      //   service: serviceId,
      //   dateReservation,
      //   ville,
      //   adresse
      // });
      // const nearByheureReservation = new Date(nearbyReservation?.heureReservation)

      // if (nearbyTimeRangeStart <= nearByheureReservation && nearByheureReservation <= nearbyTimeRangeEnd) {
      //   throw new HttpException("Une réservation pour ce service existe déjà à une heure proche", HttpStatus.BAD_REQUEST);
      // }

    if(couponCode){
      const coupon = await this.couponService.findByCode(couponCode);
      if(!coupon){
        throw new HttpException("No coupon found with the provided id", HttpStatus.BAD_REQUEST);
      }
      if(coupon.dateExpiration < new Date()){
        throw new HttpException("Le coupon a expiré", HttpStatus.BAD_REQUEST);
      }
      
      // const isCouponPresent = client.coupons.some(c => c.code === couponCode);
      // if (!isCouponPresent) {
      //   throw new HttpException("Le coupon n'est pas associé à ce client", HttpStatus.BAD_REQUEST);
      // }

      
      priceAfterDiscount = service.prix * (1 - coupon.reduction/100);
      const updatedClient = await this.clientService.removeClientCoupon(clientId, coupon._id);
      if(!updatedClient){
        throw new HttpException("Error updating Client", HttpStatus.BAD_REQUEST);
      }
    }
    
    while(!isUniqueCode){
      reservationServiceCode = generateReservationServiceCode();
      const isReservationServiceExist = await this.reservationServiceModel.findOne({ code: couponCode }).exec();
      if(!isReservationServiceExist){
        isUniqueCode = true;
      }
    }

    const reservation = new this.reservationServiceModel({
      code: reservationServiceCode,
      client,
      service,
      dateReservation,
      heureReservation,
      ville,
      adresse,
      couponCode,
      priceAfterDiscount,
    });
    return await reservation.save();
  }

}
