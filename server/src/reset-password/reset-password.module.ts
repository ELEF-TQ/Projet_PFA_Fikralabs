import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetPassword, ResetPasswordSchema } from './schemas/reset-password.schema';
import { PompistesModule } from 'src/pompistes/pompistes.module';
import { AdminModule } from 'src/admin/admin.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: ResetPassword.name,
      schema: ResetPasswordSchema
    }
  ]),ClientsModule, AdminModule,PompistesModule],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
