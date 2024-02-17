import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './schemas/service.schema';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private readonly serviceModel: Model<ServiceDocument>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    return this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id).exec();
  }
}
