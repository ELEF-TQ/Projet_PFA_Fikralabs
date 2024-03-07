import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { RolesEnum } from 'src/enums/roles.enum';
import { Coupon } from 'src/coupons/Schemas/coupon.schema';
export type ClientDocument = Client & Document;

@Schema()
export class Client {
  
 
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  phone: string;

  @Prop({required: true})
  CNI: string;

  @Prop()
  image: string;

  @Prop()
  score: number;

  @Prop({ default: RolesEnum.CLIENT }) 
  role: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }] })
  coupons: Coupon[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
