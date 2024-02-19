import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { encodePassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmailExists = await this.findOneByEmail(createUserDto.email);
    if(isEmailExists){
      throw new HttpException("Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      const encryptedPassword = encodePassword(createUserDto.password);
      const createdUser = new this.userModel({...createUserDto, password: encryptedPassword});
      return createdUser.save();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const isEmailExists = await this.findOneByEmail(updateUserDto.email);
    if(isEmailExists){
      throw new HttpException("Cannot Update User, Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      if(updateUserDto.password){
        const encryptedPassword = encodePassword(updateUserDto.password);
        return this.userModel.findByIdAndUpdate(id, {...updateUserDto, password: encryptedPassword}, { new: true }).exec();
      }else{
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      }
    }
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
