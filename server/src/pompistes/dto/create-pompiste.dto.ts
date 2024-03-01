export class CreatePompisteDto {
  readonly username: string;
  readonly matriculeRH: string;
  readonly CIN:string;
  readonly email: string;
  readonly password: string;
  readonly points?: number;
  readonly ranking?: number;
  readonly image?: string;
  readonly etoiles?: number;
}
  