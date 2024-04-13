import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pompiste, PompisteDocument } from './schemas/pompiste.schema';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { comparePasswords, encodePassword } from 'src/auth/utils/bcrypt';
import { UpdatePompisteProfileDto } from './dto/update-pompiste-profile.dto';

@Injectable()
export class PompistesService {
 

  constructor(@InjectModel(Pompiste.name) private readonly pompisteModel: Model<PompisteDocument>) {}

  async create(createPompisteDto: CreatePompisteDto): Promise<Pompiste> {
    const isEmailExists = await this.findOneByEmail(createPompisteDto.email);
    if(isEmailExists){
      throw new HttpException("L'email existe déjà", HttpStatus.BAD_REQUEST);
    }else{
      const encryptedPassword = encodePassword(createPompisteDto.password);
      const createdPompiste = new this.pompisteModel({...createPompisteDto, password: encryptedPassword});
      return createdPompiste.save();
    }
  }

  async findAll(): Promise<Pompiste[]> {
    return this.pompisteModel.find().exec();
  }

  async findOne(id: string): Promise<Pompiste> {
    return this.pompisteModel.findById(id).select('-password').exec();
  }

  async findOneByEmail(email: string): Promise<Pompiste> {
    return this.pompisteModel.findOne({email: email}).exec();
  }
  
  
  async update(id: string, updatePompisteDto: UpdatePompisteDto): Promise<Pompiste | null> {
    const { image, ...dtoWithoutImage } = updatePompisteDto;
    const updateData: any = { ...dtoWithoutImage };
    if (image === null || image === undefined ) {
      updateData.$unset = { image: '' };
    } else {
      updateData.image = image; 
    }
    try {
      const updatedPompiste = await this.pompisteModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
      return updatedPompiste;
    } catch (error) {
      console.error('Error updating pompiste:', error);
      return null;
    }
  }

  

  async updateProfilePompiste(id: string, updateProfileDto: UpdatePompisteProfileDto): Promise<Pompiste> {
    const pompiste = await this.pompisteModel.findById(id);
    if (!pompiste) {
      throw new HttpException('Pompiste not found', HttpStatus.NOT_FOUND);
    }

    // Check if the email already exists
    if (updateProfileDto.email) {
      const existingPompiste = await this.pompisteModel.findOne({ email: updateProfileDto.email });
      if (existingPompiste && existingPompiste._id.toString() !== id) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    // Check if the old password matches
    if (updateProfileDto.oldPassword && updateProfileDto.newPassword && !comparePasswords(updateProfileDto.oldPassword, pompiste.password)) {
      throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);
    }

    // Update the fields
    if (updateProfileDto.username) {
      pompiste.username = updateProfileDto.username;
    }
    if (updateProfileDto.email) {
      pompiste.email = updateProfileDto.email;
    }
    if(updateProfileDto.phone){
      pompiste.phone = updateProfileDto.phone
    }
    if(updateProfileDto.newPassword){
      pompiste.password = encodePassword(updateProfileDto.newPassword)
    }
    if(updateProfileDto.image){
      pompiste.image = updateProfileDto.image;
    }
    
    return await pompiste.save();
  }

  async remove(id: string): Promise<Pompiste> {
    return await this.pompisteModel.findByIdAndDelete(id).exec();
  }

  async destroy(ids: string[]): Promise<Pompiste[]> {
    const deletedUsers = await this.pompisteModel.find({ _id: { $in: ids } }).exec();
    await this.pompisteModel.deleteMany({ _id: { $in: ids } }).exec();
    return deletedUsers;
  }

  async getPompisteByMatriculeRH(matriculeRH: string): Promise<Pompiste> {
    const pompiste = await this.pompisteModel.findOne({ matriculeRH }).exec();
    if (pompiste) {
      return pompiste;
    }
    return null; 
  }

  async updatePompisteScore(pompiste: Pompiste, newScore: number): Promise<Pompiste> {
    const oldPompiste = await this.pompisteModel.findById(pompiste).exec();
    if (!oldPompiste) {
      throw new Error('Pompiste non trouvé');
    }
    const oldScore = oldPompiste.score || 0; 
    const updatedScore = oldScore + newScore;
    return await this.pompisteModel.findByIdAndUpdate(pompiste, { score: updatedScore }).exec();
  }

  async updatePompisteEtoiles(pompiste: Pompiste, meanEtoiles: number): Promise<void> {
    await this.pompisteModel.findByIdAndUpdate(pompiste, { etoiles: meanEtoiles }).exec();
  }

  async resetPompisteScoreToZero(pompiste: Pompiste): Promise<void> {
    try {
        await this.pompisteModel.findByIdAndUpdate(pompiste, { score: 0 }).exec();
    } catch (error) {
      throw new Error(`Échec de la réinitialisation du score du pompiste à zéro : ${error.message}`);
    }
  }

  async updatePassword(email: string, newPassword: string) {
    const updatedUser = await this.pompisteModel.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      throw new NotFoundException(`Pompiste with email ${email} not found`);
    }

    return updatedUser;
  }

  async countPompistes(): Promise<number> {
    try {
      return await this.pompisteModel.countDocuments().exec();
    } catch (error) {
      throw new Error(`Erreur lors du comptage des pompistes: ${error}`);
    }
  }

}
