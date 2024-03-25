
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { RoleSchema } from 'src/authorization/schemas/role.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Admin.name,
      schema: AdminSchema
    },
    { name: 'Role', schema: RoleSchema },
  ])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}