import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from 'src/clients/schemas/client.schema';
import { Service } from './service.schema';

@Schema()
export class ReservationService extends Document {

  @Prop()
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  client: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true })
  service: Service;

  @Prop()
  dateReservation: Date;

  @Prop()
  heureReservation: Date;

  @Prop()
  ville: string;

  @Prop({ required: true , default:0 })
  adresse: number;

  @Prop()
  couponCode: string;

}

export const ReservationServiceSchema = SchemaFactory.createForClass(ReservationService);
