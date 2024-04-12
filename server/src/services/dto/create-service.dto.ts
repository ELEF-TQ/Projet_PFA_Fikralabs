import { IsOptional } from 'class-validator';
export class CreateServiceDto {
    nom: string;
    prix: number;
    description: string;
    image :File;
}
