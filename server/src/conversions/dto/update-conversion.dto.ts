import { PartialType } from '@nestjs/swagger';
import { CreateConversionDto } from './create-conversion.dto';

export class UpdateConversionDto extends PartialType(CreateConversionDto) {}
