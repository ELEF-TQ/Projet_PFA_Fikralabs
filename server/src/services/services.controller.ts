import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReserveServiceDto } from './dto/reserve-service.dto';


@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  async create(@UploadedFile() image:File, @Body() createServiceDto: CreateServiceDto) {
    const serviceDataWithImage = { ...createServiceDto, image: image };
    return await this.servicesService.create(serviceDataWithImage);
  }

  @Get()
  async findAll() {
    return await this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.servicesService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image'))
  async update(@UploadedFile() image:File, @Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    const updateServiceDtoWithImage = { ...updateServiceDto, image: image }
    return await this.servicesService.update(id, updateServiceDtoWithImage);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.servicesService.remove(id);
  }

  @Post("/reservation")
  async reserverService(@Body() reserveServiceDto: ReserveServiceDto){
    return await this.servicesService.reserverService(reserveServiceDto);
  }

  @Get("/clientReservations/:clientId")
  async fetchClientReservations(@Param("clientId") clientId: string){
    return await this.servicesService.fetchReservationsByClientId(clientId);
  }

  @Delete("/deleteReservation/:reservationId")
  async deleteReservation(@Param("reservationId") reservationId: string){
    return await this.servicesService.deleteReservationById(reservationId);
  }
}
