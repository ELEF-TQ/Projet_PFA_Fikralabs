export const hasPermission = (user: any, permissionName: string): boolean => {
  console.log(permissionName )
    return user?.adminRole?.permissions?.some((permission: any) => {
      const permissionNameWithoutS = permissionName.endsWith('S') ? permissionName.slice(0, -1) : permissionName;
      return permission.permission === `VIEW_${permissionNameWithoutS}`;
    });
  };
  