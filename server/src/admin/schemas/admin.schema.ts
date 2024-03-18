import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum } from 'src/enums/roles.enum';


@Schema()
export class Admin {
  
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  image: File;

  @Prop({ default: RolesEnum.ADMIN }) 
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
