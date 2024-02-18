import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: 'ADMIN' }) 
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
