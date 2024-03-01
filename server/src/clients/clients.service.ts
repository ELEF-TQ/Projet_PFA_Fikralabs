import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { encodePassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class ClientsService {
  
  constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>) {}

  async create(createclienteDto: CreateClientDto): Promise<Client> {
    const isEmailExists = await this.findOneByEmail(createclienteDto.email);
    if(isEmailExists){
      throw new HttpException("Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      const encryptedPassword = encodePassword(createclienteDto.password);
      const createdUser = new this.clientModel({...createclienteDto, password: encryptedPassword});
      return createdUser.save();
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(id: string): Promise<Client> {
    return this.clientModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<Client> {
    return this.clientModel.findOne({email: email}).exec();
  }

  async update(id: string, updateclientDto: UpdateClientDto): Promise<Client> {
    const isEmailExists = await this.findOneByEmail(updateclientDto.email);
    if(isEmailExists){
      throw new HttpException("Cannot Update User, Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      if(updateclientDto.password){
        const encryptedPassword = encodePassword(updateclientDto.password);
        return this.clientModel.findByIdAndUpdate(id, {...updateclientDto, password: encryptedPassword}, { new: true }).exec();
      }else{
        return this.clientModel.findByIdAndUpdate(id, updateclientDto, { new: true }).exec();
      }
    }
  }

  async remove(id: string): Promise<Client> {
    return await this.clientModel.findByIdAndDelete(id).exec();
  }
  
  async getClientByPhone(phone: string): Promise<Client> {
    const client = await this.clientModel.findOne({ phone: phone }).exec();
    if (client) {
      return client;
    }
    return null;
  }

  async updateClientScore(client: Client, clientScore: number): Promise<void> {
    await this.clientModel.findByIdAndUpdate(client, { $inc: { score: clientScore } }).exec();
  }

}
