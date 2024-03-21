import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from '../schemas/permission.schema';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const createdPermission = new this.permissionModel(createPermissionDto);
    return createdPermission.save();
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findOne(id: string): Promise<Permission> {
    return this.permissionModel.findById(id).exec();
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return this.permissionModel.findByIdAndUpdate(id, updatePermissionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Permission> {
    return this.permissionModel.findByIdAndDelete(id).exec();
  }
}
