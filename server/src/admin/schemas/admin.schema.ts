import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Admin {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'ADMIN' }) 
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(Admin);
