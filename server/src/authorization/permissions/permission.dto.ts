export class CreatePermissionDto {
    readonly key: string;
    readonly description: string;
  }
  
  export class UpdatePermissionDto {
    readonly key?: string;
    readonly description?: string;
  }