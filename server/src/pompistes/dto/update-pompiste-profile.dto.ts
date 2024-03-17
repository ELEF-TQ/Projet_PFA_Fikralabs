import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePompisteProfileDto {

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly oldPassword?: string;

  @IsOptional()
  @IsString()
  readonly NewPassword?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  readonly image?: File;

}
  