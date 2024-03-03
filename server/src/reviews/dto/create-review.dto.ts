import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {

    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @IsNotEmpty()
    @IsString()
    readonly matriculeRH: string;

    @IsNotEmpty()
    @IsNumber()
    readonly etoiles: number;

    @IsOptional()
    @IsString()
    readonly commentaire?: string;
}
  