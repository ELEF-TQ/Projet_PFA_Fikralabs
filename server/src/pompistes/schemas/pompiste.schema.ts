import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RolesEnum } from 'src/enums/roles.enum';

export type PompisteDocument = Pompiste & Document;

@Schema()
export class Pompiste {

  @Prop({required :true})
  matriculeRH: string;

  @Prop({required :true})
  CIN:string;

  @Prop({ required: true })
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  email:string;

  @Prop()
  phone: string;

  @Prop({default:0}) 
  score: number;

  @Prop({default:0})
  etoiles:number;

  @Prop({default:0})
  solde:number;

  @Prop()
  image: File;

  @Prop({default: RolesEnum.POMPISTE})
  role:string;

  @Prop() 
  QrCode: string;

}

export const PompisteSchema = SchemaFactory.createForClass(Pompiste);
