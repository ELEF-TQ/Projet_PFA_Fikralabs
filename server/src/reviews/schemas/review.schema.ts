import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from 'src/clients/schemas/client.schema';
import { Pompiste } from 'src/pompistes/schemas/pompiste.schema';

@Schema()
export class Review extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  client: Client;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pompiste', required: true })
  pompiste: Pompiste;

  @Prop({ required: true , default:0 })
  etoiles: number;

  @Prop()
  commentaire:string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
