import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { comparePasswords, encodePassword } from 'src/auth/utils/bcrypt';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';

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

  async updateProfileAdmin(id: string, updateProfileDto: UpdateAdminProfileDto): Promise<Admin> {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    // Check if the email already exists
    if (updateProfileDto.email) {
      const existingAdmin = await this.adminModel.findOne({ email: updateProfileDto.email });
      if (existingAdmin && existingAdmin._id.toString() !== id) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    // Check if the old password matches
    if (updateProfileDto.oldPassword && updateProfileDto.newPassword && !comparePasswords(updateProfileDto.oldPassword, admin.password)) {
      throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);
    }

    // Update the fields
    if (updateProfileDto.username) {
      admin.username = updateProfileDto.username;
    }
    if (updateProfileDto.email) {
      admin.email = updateProfileDto.email;
    }
    if(updateProfileDto.phone){
      admin.phone = updateProfileDto.phone
    }
    if(updateProfileDto.newPassword){
      admin.password = encodePassword(updateProfileDto.newPassword)
    }
    if(updateProfileDto.image){
      admin.image = updateProfileDto.image;
    }
    
    return await admin.save();
  }

  async remove(id: string): Promise<Admin | null> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }

  async updatePassword(email: string, newPassword: string) {
    const updatedUser = await this.adminModel.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }

    return updatedUser;
  }

}
