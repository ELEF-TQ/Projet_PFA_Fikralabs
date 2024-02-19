import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AdminService } from 'src/admin/admin.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { Admin } from 'src/admin/schemas/admin.schema';
import { comparePasswords } from './utils/bcrypt';
import { IsEmailAlreadyExists } from './utils/IsEmailAlreadyExist';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser({email, password}: AuthPayloadDto): Promise<any> {
    const userOrAdminFound = await this.findOneByEmail(email);
    if(!userOrAdminFound ){
      throw new HttpException("User Not found, Unnable to login", 404);
    }else{
      const isPasswordMatched = comparePasswords(password, userOrAdminFound.password);
      if(isPasswordMatched){
        const {password, ...userDetails} = userOrAdminFound;
        return {
          user: userOrAdminFound ,
          JWT: this.jwtService.sign(userDetails)
        }
      }else{
        throw new HttpException("Wrong Password", 403);
      }
    }
  }

  async register(userDetails: CreateUserDto){
    const IsExists = await IsEmailAlreadyExists(userDetails, this.usersService, this.adminService);
    if(IsExists){
      throw new HttpException("Email already Exist", HttpStatus.BAD_REQUEST);
    }else{
      const userCreated = await this.usersService.create(userDetails);
      return userCreated;
    }
  }

  async findOneById(id: string): Promise<User | Admin> {
    const userClient = await this.usersService.findOne(id);
    if(!userClient) {
      const userAdmin = await this.adminService.findOne(id);
      if(!userAdmin){
        throw new HttpException("User Doesn't exist", 404)
      }else{
        return userAdmin;
      }
    }else{
      return userClient;
    }
  }

  async findOneByEmail(email: string): Promise<User | Admin> {
    const userClient = await this.usersService.findOneByEmail(email);
    if(!userClient) {
      const userAdmin = await this.adminService.findOneByEmail(email);
      if(!userAdmin){
        return null;
      }else{
        return userAdmin;
      }
    }else{
      return userClient;
    }
  }


}
