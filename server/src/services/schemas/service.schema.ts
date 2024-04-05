import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Service extends Document {

  @Prop()
  nom: string;

  @Prop()
  prix: number;

  @Prop()
  description: string;

}

export const ServiceSchema = SchemaFactory.createForClass(Service);
