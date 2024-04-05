import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    readonly nom: string;

    @IsNotEmpty()
    @IsNumber()
    readonly prix: number;

    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
