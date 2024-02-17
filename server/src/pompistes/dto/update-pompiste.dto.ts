import { PartialType } from '@nestjs/mapped-types';
import { CreatePompisteDto } from './create-pompiste.dto';

export class UpdatePompisteDto extends PartialType(CreatePompisteDto) {}
