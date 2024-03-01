import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pompiste, PompisteDocument } from './schemas/pompiste.schema';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PompistesService {

  constructor(@InjectModel(Pompiste.name) private readonly pompisteModel: Model<PompisteDocument>) {}

  async create(createPompisteDto: CreatePompisteDto): Promise<Pompiste> {
    const createdPompiste = new this.pompisteModel(createPompisteDto);
    return createdPompiste.save();
  }

  async findAll(): Promise<Pompiste[]> {
    return this.pompisteModel.find({}).exec();
  }

  async findOne(matriculeRH: string): Promise<Pompiste> {
    return this.pompisteModel.findOne({ matriculeRH }).exec(); 
  }
  
  async update(id: string, updatePompisteDto: UpdatePompisteDto): Promise<Pompiste> {
    return this.pompisteModel.findByIdAndUpdate(id, updatePompisteDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.pompisteModel.findByIdAndDelete(id).exec();
  }

  async destroy(ids: string[]): Promise<void> {
    try {
      console.log('IDs to delete:', ids);
      await this.pompisteModel.deleteMany({ _id: { $in: ids } }).exec();
      console.log('Documents deleted successfully.');
    } catch (error) {
      console.error('Error deleting documents:', error);
      throw error; 
    }
  }

  async getPompisteByMatriculeRH(matriculeRH: string): Promise<Pompiste> {
    const pompiste = await this.pompisteModel.findOne({ matriculeRH }).exec();
    if (pompiste) {
      return pompiste;
    }
    return null; 
  }

  async updatePompisteScore(pompisteId: string, pompisteScore: number): Promise<void> {
    await this.pompisteModel.findByIdAndUpdate(pompisteId, { $inc: { score: pompisteScore } }).exec();
  }

  async updateEtoiles(pompiste: Pompiste, meanEtoiles: number): Promise<void> {
    await this.pompisteModel.findByIdAndUpdate(pompiste, { etoiles: meanEtoiles }).exec();
  }


}
