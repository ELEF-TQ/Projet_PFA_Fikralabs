import { PompistesService } from 'src/pompistes/pompistes.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AdminService } from 'src/admin/admin.service';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { Client } from 'src/clients/schemas/client.schema';
import { Admin } from 'src/admin/schemas/admin.schema';
import { comparePasswords } from './utils/bcrypt';
import { IsEmailAlreadyExists } from './utils/IsEmailAlreadyExist';
import { Pompiste } from 'src/pompistes/schemas/pompiste.schema';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private adminService: AdminService,
    private pompistesService : PompistesService,
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

  async register(userDetails: CreateClientDto){
    const IsExists = await IsEmailAlreadyExists(userDetails, this.clientsService, this.adminService);
    if(IsExists){
      throw new HttpException("Email already Exist", HttpStatus.BAD_REQUEST);
    }else{
      const userCreated = await this.clientsService.create(userDetails);
      return userCreated;
    }
  }

  async findOneById(id: string): Promise<Client | Admin> {
    const userClient = await this.clientsService.findOne(id);
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

  async findOneByEmail(email: string): Promise<Client | Admin | Pompiste | null> {
    const userClient = await this.clientsService.findOneByEmail(email);
    if (userClient) {
      return userClient;
    }
  
    const userAdmin = await this.adminService.findOneByEmail(email);
    if (userAdmin) {
      return userAdmin;
    }
  
    const userPompiste = await this.pompistesService.findOneByEmail(email);
    if (userPompiste) {
      return userPompiste;
    }
  
    return null;
  }
  


}
