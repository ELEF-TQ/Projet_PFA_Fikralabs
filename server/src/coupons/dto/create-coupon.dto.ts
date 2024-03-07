import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCouponDto {
  @IsNotEmpty()
  @IsNumber()
  reduction: number;

  @IsNotEmpty()
  @IsNumber()
  nbrDisponible: number;

  @IsNotEmpty()
  @IsDateString()
  dateExpiration: Date;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
  