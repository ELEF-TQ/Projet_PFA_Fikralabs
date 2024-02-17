import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  image: string;

  @Prop()
  phone: string;

  @Prop()
  points: number;

  @Prop()
  sold: number;

  @Prop({ default: 'CLIENT' }) 
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
