import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model, Types } from 'mongoose';
import { comparePasswords, encodePassword } from 'src/auth/utils/bcrypt';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { Role } from 'src/authorization/schemas/role.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>,
  @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const isEmailExists = await this.findOneByEmail(createAdminDto.email);
    if (isEmailExists) {
        throw new HttpException("Email already Exists", HttpStatus.BAD_REQUEST);
    } else {
        const roleExists = await this.roleModel.findById(createAdminDto.adminRole);
        if (!roleExists) {
            throw new HttpException("Invalid Role ID", HttpStatus.BAD_REQUEST);
        }

        const encryptedPassword = encodePassword(createAdminDto.password);
        const createdAdmin = new this.adminModel({
            ...createAdminDto,
            password: encryptedPassword,
            adminRole: new Types.ObjectId(createAdminDto.adminRole) 
        });
        return createdAdmin.save();
    }
}

 

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find() 
    .populate({
      path: 'adminRole',
      populate: {
        path: 'permissions', 
        model: 'Permission' 
      }
    })
    .exec();
  }

  async findOne(id: string): Promise<Admin | null> {
    return this.adminModel.findById(id).select('-password').exec();
  }
  

  async findOneByEmail(email: string): Promise<Admin> {
    return this.adminModel.findOne({email: email}).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin | null> {
    const { image, ...dtoWithoutImage } = updateAdminDto;
    const updateData: any = { ...dtoWithoutImage };
    if (image === null || image === undefined ) {
      updateData.$unset = { image: '' };
    } else {
      updateData.image = image; 
    }
    try {
      const updatedPompiste = await this.adminModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
      return updatedPompiste;
    } catch (error) {
      console.error('Error updating admin:', error);
      return null;
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
