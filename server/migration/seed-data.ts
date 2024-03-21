// migration/seed-data.ts
import { getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { PERMISSIONS } from './PERMISSIONS';

async function seedPermissions(connection: Connection) {
  const PermissionModel = connection.model('Permission'); 

  for (const key in PERMISSIONS) {
    if (PERMISSIONS.hasOwnProperty(key)) {
      const permission = {
        key: key,
        description: PERMISSIONS[key],
      };
      await PermissionModel.create(permission);
    }
  }

  console.log('Permission seeding completed.');
}

export default seedPermissions;
