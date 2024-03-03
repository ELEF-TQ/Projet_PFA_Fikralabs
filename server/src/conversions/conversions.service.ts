import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateConversionDto } from './dto/create-conversion.dto';
// import { UpdateConversionDto } from './dto/update-conversion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conversion } from './schemas/conversion.schema';
import { Model } from 'mongoose';
import { PompistesService } from 'src/pompistes/pompistes.service';
import { calculeMontant } from './utils/calculeMontant';
import { ConversionStatus } from './enums/conversionStatus';

@Injectable()
export class ConversionsService {
  

  constructor(
    @InjectModel(Conversion.name) private readonly conversionModel: Model<Conversion>,
    private readonly pompisteService: PompistesService
  ){}

  async create(pompisteId: string) {
    const pompiste = await this.pompisteService.findOneById(pompisteId);
    if(!pompiste){
      throw new NotFoundException(`Aucun pompiste avec cet id ${pompisteId}`);
    }

    const score = pompiste.score;
    if(score < 2500){
      throw new HttpException("Impossible de convertir une somme de points qui est inferieur à 2500pts", HttpStatus.BAD_REQUEST);
    }
    
    const montant = calculeMontant(score);
    const createdConversion = new this.conversionModel({pompiste: pompiste, score: score, montant: montant, dateConversion: new Date()})
    const savedConversion = await createdConversion.save();
    if(savedConversion){
      const scoreAfterConversion = 0
      const updatedpompiste = await this.pompisteService.updatePompisteScore(pompisteId, scoreAfterConversion);
      return savedConversion;
    }else{
      throw new HttpException("Probleme occurs", HttpStatus.AMBIGUOUS);
    }
  }

  findAll() {
    return `This action returns all conversions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} conversion`;
  }

  async update(id: string): Promise<Conversion> {
    try {
      const conversion = await this.conversionModel.findById(id);
      conversion.status = ConversionStatus.ACCEPTED;
      const updatedConversion = await conversion.save();
      return updatedConversion;
    } catch (error) {
      throw new Error(`Failed to update conversion status: ${error.message}`);
    }
  }

  async updateAll(ids: string[]): Promise<Conversion[]> {
    try {
      const updatedConversions: Conversion[] = [];
      for (const id of ids) {
        const conversion = await this.conversionModel.findById(id);
        conversion.status = ConversionStatus.ACCEPTED;
        const updatedConversion = await conversion.save();
        updatedConversions.push(updatedConversion);
      }
      return updatedConversions;
    } catch (error) {
      throw new Error(`Failed to update conversions: ${error.message}`);
    }
  }
 
}
