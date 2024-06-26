import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversion } from './schemas/conversion.schema';
import { Model } from 'mongoose';
import { PompistesService } from 'src/pompistes/pompistes.service';
import { calculeMontant } from './utils/calculeMontant';
import { ConversionStatus } from './enums/conversionStatus';
import { generateRandomNumber } from './utils/generateRandomNumber';
import { Pompiste } from 'src/pompistes/schemas/pompiste.schema';


@Injectable()
export class ConversionsService {
 
  
  constructor(
    @InjectModel(Conversion.name) private readonly conversionModel: Model<Conversion>,
    @InjectModel(Pompiste.name) private readonly pompisteModel: Model<Pompiste>,
    private readonly pompisteService: PompistesService
  ){}

  async create(pompisteId: string) {
    const pompiste = await this.pompisteService.findOne(pompisteId);
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
        await this.pompisteService.resetPompisteScoreToZero(pompiste);
        return savedConversion;
    } else {
        throw new HttpException("Probleme occurs", HttpStatus.AMBIGUOUS);
    }
  }

 

  async findAllByPompiste(pompisteId: string): Promise<Conversion[]> {
    const pompiste = await this.pompisteService.findOne(pompisteId);
    if (!pompiste) {
        throw new NotFoundException(`Aucun pompiste avec cet id ${pompisteId}`);
    }
    return await this.conversionModel
    .find({ pompiste: pompiste })
    .exec();
  }

  async findAll() {
    return this.conversionModel.find().populate('pompiste', 'username').exec();
  }

  async findOne(id: string) {
    return this.conversionModel.findById(id);
  }
 

  async acceptOne(id: string) {
    const conversion = await this.conversionModel.findById(id);
    const pompisteId = conversion.pompiste;
    const pompiste = await this.pompisteModel.findById(pompisteId);
    conversion.status = ConversionStatus.ACCEPTED;
    pompiste.solde += conversion.montant;
    await conversion.save();
    await pompiste.save();
    return conversion;
  }

  async acceptAll(ids: string[]) {
    const updatedConversions = await this.conversionModel.updateMany(
      { _id: { $in: ids }, status: ConversionStatus.PENDING  },
      { $set: { status: ConversionStatus.ACCEPTED } }
    ).exec();
    return updatedConversions;
  }

  async countConversions(): Promise<number> {
    try {
      return await this.conversionModel.countDocuments().exec();
    } catch (error) {
      throw new Error(`Erreur lors du comptage des conversions: ${error}`);
    }
  }
}




 

