import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClientDto {

  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly CIN: string;
  readonly phone?: string;

  @IsOptional()
  readonly image?: File;


 


}
  