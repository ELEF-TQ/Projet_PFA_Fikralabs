import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupon extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  reduction: number;

  @Prop({ required: true })
  nbrDisponible: number;

  @Prop({ required: true })
  dateExpiration: Date;

}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
