import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pompiste, PompisteDocument } from './schemas/pompiste.schema';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { encodePassword } from 'src/auth/utils/bcrypt';

@Injectable()
export class PompistesService {

  constructor(@InjectModel(Pompiste.name) private readonly pompisteModel: Model<PompisteDocument>) {}

  async create(createPompisteDto: CreatePompisteDto): Promise<Pompiste> {
    const isEmailExists = await this.findOneByEmail(createPompisteDto.email);
    if(isEmailExists){
      throw new HttpException("Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      const encryptedPassword = encodePassword(createPompisteDto.password);
      const createdPompiste = new this.pompisteModel({...createPompisteDto, password: encryptedPassword});
      return createdPompiste.save();
    }
  }

  async findAll(): Promise<Pompiste[]> {
    return this.pompisteModel.find().exec();
  }

  async findOne(matriculeRH: string): Promise<Pompiste> {
    return this.pompisteModel.findOne({ matriculeRH }).exec(); 
  }

  async findOneById(id: string): Promise<Pompiste> {
    return this.pompisteModel.findOne({_id: id}) 
  }

  async findOneByEmail(email: string): Promise<Pompiste> {
    return this.pompisteModel.findOne({email: email}).exec();
  }
  
  async update(id: string, updatePompisteDto: UpdatePompisteDto): Promise<Pompiste> {
    const isEmailExists = await this.findOneByEmail(updatePompisteDto.email);
    if(isEmailExists){
      throw new HttpException("Cannot Update User, Email already Exists", HttpStatus.BAD_REQUEST);
    }else{
      if(updatePompisteDto.password){
        const encryptedPassword = encodePassword(updatePompisteDto.password);
        return await this.pompisteModel.findByIdAndUpdate(id, {...updatePompisteDto, password: encryptedPassword}, {new: true}).exec();
      }else{
        return this.pompisteModel.findByIdAndUpdate(id, updatePompisteDto, { new: true }).exec();
      }
    }
  }

  async remove(id: string): Promise<Pompiste> {
    return await this.pompisteModel.findByIdAndDelete(id).exec();
  }

  async destroy(ids: string[]): Promise<Pompiste[]> {
        // Fetch the users to be deleted
        const deletedUsers = await this.pompisteModel.find({ _id: { $in: ids } }).exec();

        // Delete the users
        await this.pompisteModel.deleteMany({ _id: { $in: ids } }).exec();
    
        // Return the deleted users
        return deletedUsers;
  }

  async getPompisteByMatriculeRH(matriculeRH: string): Promise<Pompiste> {
    const pompiste = await this.pompisteModel.findOne({ matriculeRH }).exec();
    if (pompiste) {
      return pompiste;
    }
    return null; 
  }

  async updatePompisteScore(pompisteId: string, pompisteScore: number): Promise<Pompiste> {
    const pompiste = await this.pompisteModel.findById(pompisteId);
    return await this.pompisteModel.findByIdAndUpdate(pompiste, { score: pompisteScore }).exec();
  }

  async updateEtoiles(pompiste: Pompiste, meanEtoiles: number): Promise<void> {
    await this.pompisteModel.findByIdAndUpdate(pompiste, { etoiles: meanEtoiles }).exec();
  }


}
