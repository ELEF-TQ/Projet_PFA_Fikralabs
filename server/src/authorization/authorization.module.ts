import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './roles/role.controller';
import { PermissionController } from './permissions/permission.controller';
import { RoleService } from './roles/role.service';
import { PermissionService } from './permissions/permission.service';
import { RoleSchema } from './schemas/role.schema';
import { PermissionSchema } from './schemas/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema },
      { name: 'Permission', schema: PermissionSchema },
    ]),
  ],
  controllers: [RoleController, PermissionController],
  providers: [RoleService, PermissionService],

})
export class AuthorizationModule {}
