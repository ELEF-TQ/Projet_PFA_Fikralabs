import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client', required: true })
  client: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Pompiste', required: true })
  pompiste: string;

  @Prop({ required: true })
  etoiles: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
