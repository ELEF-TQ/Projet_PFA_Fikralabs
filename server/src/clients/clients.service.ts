import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { comparePasswords, encodePassword } from 'src/auth/utils/bcrypt';
import { Coupon } from 'src/coupons/Schemas/coupon.schema';
import { UpdateClientProfileDto } from './dto/update-client-profile.dto';

@Injectable()
export class ClientsService {
 
  constructor(@InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>) {}

  async create(createclienteDto: CreateClientDto): Promise<Client> {
    const isEmailExists = await this.findOneByEmail(createclienteDto.email);
    if(isEmailExists){
      throw new HttpException("Email déjà existant", HttpStatus.BAD_REQUEST);
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
    return this.clientModel.findById(id).select('-password').exec();
  }  


  async findOneByEmail(email: string): Promise<Client> {
    return this.clientModel.findOne({email: email}).exec();
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client | null> {
    const { image, ...dtoWithoutImage } = updateClientDto;
    const updateData: any = { ...dtoWithoutImage };
    if (image === null || image === undefined) {
      updateData.$unset = { image: '' };
    } else {
      updateData.image = image;
    }
    try {
      const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, updateData, { new: true }) 
      return updatedClient;
    } catch (error) {
      console.error('Error updating Client:', error);
      return null;
    }
  }

  async remove(id: string): Promise<Client> {
    return await this.clientModel.findByIdAndDelete(id).exec();
  }
  
  async getClientByPhone(phone: string): Promise<Client> {
    const client = await this.clientModel.findOne({ phone: phone }).exec();
    if (client) {
        return client;
    } else {
        throw new NotFoundException('Ce numéro de téléphone n\'existe pas.');
    }
}

  async updateClientScore(client: Client, clientScore: number): Promise<void> {
    await this.clientModel.findByIdAndUpdate(client, { $inc: { score: clientScore } }).exec();
  }

  async updateClientCoupons(client: Client, coupon: Coupon): Promise<Client> {
    try {
      const updatedClient = await this.clientModel.findByIdAndUpdate( client,
        { $addToSet: { coupons: coupon._id } ,
          $inc: { score : -coupon.score }
        }, 
        { new: true } 
      ).exec();

      return updatedClient;
    } catch (error) {
      throw new Error('Une erreur est survenue lors de la réservation du coupon');    }
  }


  async removeClientCoupon(clientId: string, couponId: string): Promise<Client | null> {
    try {
      // Recherche du client par ID et mise à jour
      const updatedClient = await this.clientModel.findByIdAndUpdate(
        clientId,
        { $pull: { coupons: couponId } }, // Utilisation de $pull pour supprimer le coupon de la liste
        { new: true } // Renvoie le client mis à jour
      ).exec();
  
      return updatedClient;
    } catch (error) {
      // Gestion des erreurs
      throw new Error('Une erreur est survenue lors de la suppression du coupon du client');
    }
  }  

  async isCouponInClientCoupons(clientId: string, coupon: Coupon): Promise<boolean> {
    try {
      // Recherche du client par ID
      const client = await this.clientModel.findById(clientId).exec();
  
      if (!client) {
        // Si le client n'est pas trouvé, retourne false
        return false;
      }
  
      // Vérifie si le coupon est présent dans la liste des coupons du client
      const isCouponPresent = client.coupons.some(c => c.equals(coupon._id));
  
      return isCouponPresent;
    } catch (error) {
      // Gestion des erreurs
      throw new Error('Une erreur est survenue lors de la vérification de la présence du coupon dans la liste du client');
    }
  }  

  async updateProfileClient(id: string, updateProfileDto: UpdateClientProfileDto): Promise<Client> {
    const client = await this.clientModel.findById(id);
    if (!client) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }

    // Check if the email already exists
    if (updateProfileDto.email) {
      const existingClient = await this.clientModel.findOne({ email: updateProfileDto.email });
      if (existingClient && existingClient._id.toString() !== id) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    // Check if the old password matches
    if (updateProfileDto.oldPassword && updateProfileDto.newPassword && !comparePasswords(updateProfileDto.oldPassword, client.password)) {
      throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);
    }

    // Update the fields
    if (updateProfileDto.username) {
      client.username = updateProfileDto.username;
    }
    if (updateProfileDto.email) {
      client.email = updateProfileDto.email;
    }
    if(updateProfileDto.phone){
      client.phone = updateProfileDto.phone
    }
    if(updateProfileDto.newPassword){
      client.password = encodePassword(updateProfileDto.newPassword)
    }
    if(updateProfileDto.image){
      client.image = updateProfileDto.image;
    }
    
    return await client.save();
  }
  

  async findReservedCouponsByClientId(clientId: string): Promise<Coupon[]> {
    const client = await this.clientModel.findById(clientId).populate('coupons').exec();
    if (!client) {
      throw new HttpException({ message: "Client non trouvé" }, HttpStatus.NOT_FOUND);
    }
    return client.coupons;
  }

  async destroy(ids: string[]): Promise<Client[]> {
    const deletedClients = await this.clientModel.find({ _id: { $in: ids } }).exec();
    await this.clientModel.deleteMany({ _id: { $in: ids } }).exec();
    return deletedClients;
  }

  async updatePassword(email: string, newPassword: string) {
    const updatedUser = await this.clientModel.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return updatedUser;
  }
  
  async countClients(): Promise<number> {
    try {
      return await this.clientModel.countDocuments().exec();
    } catch (error) {
      throw new Error(`Erreur lors du comptage des clients: ${error}`);
    }
  }
 
}
