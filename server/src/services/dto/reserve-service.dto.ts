import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ReserveServiceDto {

    @IsNotEmpty()
    @IsString()
    clientId: string;

    @IsNotEmpty()
    @IsString()
    serviceId: string;
  
    @IsNotEmpty()
    dateReservation: Date;
  
    @IsNotEmpty()
    heureReservation: Date;
  
    @IsNotEmpty()
    @IsString()
    ville: string;
  
    @IsNotEmpty()
    @IsString()
    adresse: string;
  
    @IsOptional()
    @IsString()
    couponCode?: string;

}
