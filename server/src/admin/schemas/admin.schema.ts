import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from 'src/authorization/schemas/role.schema';
import { RolesEnum } from 'src/enums/roles.enum';


@Schema()
export class Admin {
  
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  
  @Prop({ required: true })
  CIN: string;

  @Prop()
  phone: string;

  @Prop()
  image: File;

  @Prop({ default: RolesEnum.ADMIN }) 
  role: string;

  @Prop({type: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'role' }] })
  adminRole : Role
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
