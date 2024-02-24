import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  email:string;

  @Prop({default:5}) //to be changed to 0
  score: number;

  @Prop({default:99})
  rank: number;

  @Prop({default:0})
  solde:number;

  @Prop()
  image: string;

  @Prop({default :"POMPISTE"})
  role:string;

}

export const PompisteSchema = SchemaFactory.createForClass(Pompiste);
