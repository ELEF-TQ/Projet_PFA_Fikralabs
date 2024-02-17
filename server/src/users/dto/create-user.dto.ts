export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly image?: string;
    readonly phone?: string;
    readonly points?: number;
    readonly sold?: number;
    readonly role?: string;
  }
  