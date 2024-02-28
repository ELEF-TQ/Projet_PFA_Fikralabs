import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @IsOptional()
    @IsString()
    readonly username?: string;
  
    @IsOptional()
    @IsEmail()
    readonly email?: string;
  
    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsString()
    readonly CNI: string;
  
    @IsOptional()
    @IsString()
    readonly image?: string;
  
    @IsOptional()
    @IsString()
    readonly phone?: string;
  
    @IsOptional()
    @IsNumber()
    readonly points?: number;
  
    @IsOptional()
    @IsNumber()
    readonly sold?: number;
}
