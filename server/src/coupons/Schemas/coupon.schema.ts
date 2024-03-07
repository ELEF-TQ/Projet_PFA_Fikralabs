import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupon extends Document {

  @Prop({ required: true , unique: true })
  code: string;

  @Prop({ required: true })
  reduction: number;

  @Prop({ required: true })
  nbrDisponible: number;

  @Prop({ required: true })
  dateExpiration: Date;

  @Prop({ required: true })
  score: number;

}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
