import { getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { PERMISSIONS } from './PERMISSIONS';

async function seedPermissions(connection: Connection) {
  const PermissionModel = connection.model('Permission');

  const count = await PermissionModel.countDocuments();
  if (count > 0) {
    console.log('Permissions already seeded.');
    return;
  }

  for (const key in PERMISSIONS) {
    if (PERMISSIONS.hasOwnProperty(key)) {
      const permission = {
        permission: key,
      };
      await PermissionModel.create(permission);
    }
  }

  console.log('Permission seeding completed.');
}

export default seedPermissions;
