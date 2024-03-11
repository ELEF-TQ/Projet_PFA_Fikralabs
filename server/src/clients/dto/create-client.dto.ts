import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly CIN: string;

  @IsOptional()
  @IsString()
  readonly image?: File;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsNumber()
  readonly score?: number;

  @IsOptional()
  @IsNumber()
  readonly solde?: number;
}
  