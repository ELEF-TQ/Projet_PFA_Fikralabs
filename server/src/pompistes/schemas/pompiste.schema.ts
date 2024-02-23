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

  @Prop()
  email:string;

  @Prop()
  score: number;

  @Prop()
  ranking: number;

  @Prop()
  solde:number;

  @Prop()
  image: string;

  @Prop({default :"POMPISTE"})
  role:string;

}

export const PompisteSchema = SchemaFactory.createForClass(Pompiste);
