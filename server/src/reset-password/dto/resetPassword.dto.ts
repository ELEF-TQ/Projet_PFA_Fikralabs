import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    @IsString()
    code: string

    @IsNotEmpty()
    @IsString()
    password: string
    
}
