import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthPayloadDto {
    
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @IsString()
    password: string;
};