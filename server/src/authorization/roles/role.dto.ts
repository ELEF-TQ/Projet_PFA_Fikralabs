export class CreateRoleDto {
    readonly name: string;
    readonly permissions: string[];
  }


export class UpdateRoleDto {
    readonly name?: string;
    readonly permissions?: string[];
  }
  