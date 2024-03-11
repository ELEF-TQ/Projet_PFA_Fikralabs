import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { encodePassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const isEmailExists = await this.findOneByEmail(createAdminDto.email);
    if(isEmailExists){
      throw new HttpException("Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      const encryptedPassword = encodePassword(createAdminDto.password);
      const createdAdmin = new this.adminModel({...createAdminDto, password: encryptedPassword});
      return createdAdmin.save();
    }
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin | null> {
    return this.adminModel.findById(id).select('-password').exec();
  }
  

  async findOneByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({email: email}).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin | null> {
    const isEmailExists = await this.findOneByEmail(updateAdminDto.email);
    if(isEmailExists){
      throw new HttpException("Cannot Update Admin, Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      if(updateAdminDto.password){ // çàd si l'user a modifier son password
        const encryptedPassword = encodePassword(updateAdminDto.password);
        return this.adminModel.findByIdAndUpdate(id, {...updateAdminDto, password: encryptedPassword}, { new: true }).exec();
      }else{
        return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
      }
    }
  }

  async remove(id: string): Promise<Admin | null> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }
}
