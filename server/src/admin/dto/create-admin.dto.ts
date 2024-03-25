import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/authorization/schemas/role.schema";

export class CreateAdminDto {
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
    readonly phone: string;

    @IsNotEmpty()
    @IsString()
    readonly adminRole: string;

    
    @IsOptional()
    readonly image?: File;

    @IsNotEmpty()
    @IsString()
    readonly CIN: string;
}