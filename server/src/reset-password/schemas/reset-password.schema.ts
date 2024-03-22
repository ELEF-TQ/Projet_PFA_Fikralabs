import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ResetPassword extends Document {

  @Prop()
  email: string;

  @Prop()
  code: string;

  @Prop()
  role: string;

}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
