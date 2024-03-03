import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pompiste } from 'src/pompistes/schemas/pompiste.schema';
import { ConversionStatus } from '../enums/conversionStatus';

@Schema()
export class Conversion extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pompiste', required: true })
  pompiste: Pompiste;

  @Prop({ required: true , default:0 })
  score: number;

  @Prop()
  montant:number;

  @Prop()
  dateConversion: Date;

  @Prop({default: ConversionStatus.PENDING})
  status:string;

}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
