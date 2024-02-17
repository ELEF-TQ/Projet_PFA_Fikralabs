import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PompisteDocument = Pompiste & Document;

@Schema()
export class Pompiste {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  points: number;

  @Prop()
  ranking: number;

  @Prop()
  image: string;
}

export const PompisteSchema = SchemaFactory.createForClass(Pompiste);
