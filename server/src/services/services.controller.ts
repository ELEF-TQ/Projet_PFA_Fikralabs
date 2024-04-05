import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createServiceDto: CreateServiceDto) {
    return await this.servicesService.create(createServiceDto);
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
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return await this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.servicesService.remove(id);
  }
}
