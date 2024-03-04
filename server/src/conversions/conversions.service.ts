import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversion } from './schemas/conversion.schema';
import { Model } from 'mongoose';
import { PompistesService } from 'src/pompistes/pompistes.service';
import { calculeMontant } from './utils/calculeMontant';
import { ConversionStatus } from './enums/conversionStatus';
import { generateRandomNumber } from './utils/generateRandomNumber';


@Injectable()
export class ConversionsService {
  constructor(
    @InjectModel(Conversion.name) private readonly conversionModel: Model<Conversion>,
    private readonly pompisteService: PompistesService
  ){}

  async create(pompisteId: string) {
    const pompiste = await this.pompisteService.findOneById(pompisteId);
    if (!pompiste) {
        throw new NotFoundException(`Aucun pompiste avec cet id ${pompisteId}`);
    }

    const score = pompiste.score;
    if (score < 2500) {
        throw new HttpException("Impossible de convertir une somme de points qui est inferieur à 2500 pts", HttpStatus.BAD_REQUEST);
    }
    
    const montant = calculeMontant(score);
    const numDemande = generateRandomNumber();
    const createdConversion = new this.conversionModel({
        pompiste: pompiste,
        score: score,
        montant: montant,
        dateConversion: new Date(),
        Num_Demande: numDemande 
    });
    const savedConversion = await createdConversion.save();
    if (savedConversion) {
        const scoreAfterConversion = 0;
        const updatedpompiste = await this.pompisteService.updatePompisteScore(pompiste, scoreAfterConversion);
        return savedConversion;
    } else {
        throw new HttpException("Probleme occurs", HttpStatus.AMBIGUOUS);
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

  async findAllByPompiste(pompisteId: string): Promise<Conversion[]> {
    const pompiste = await this.pompisteService.findOneById(pompisteId);
    if (!pompiste) {
        throw new NotFoundException(`Aucun pompiste avec cet id ${pompisteId}`);
    }
    return await this.conversionModel
    .find({ pompiste: pompiste })
    .exec();
  }
}

 

