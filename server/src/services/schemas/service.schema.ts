import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  disponibility: boolean;

  @Prop()
  image: string;

  @Prop({  min: 0 })
  available: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
