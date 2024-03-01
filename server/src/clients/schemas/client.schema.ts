import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RolesEnum } from 'src/enums/roles.enum';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  
  // @Prop()
  // _id?: string;

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

  @Prop()
  sold: number;

  @Prop({ default: RolesEnum.CLIENT }) 
  role: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);