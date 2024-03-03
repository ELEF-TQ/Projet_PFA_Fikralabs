import { Module } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Conversion, ConversionSchema } from './schemas/conversion.schema';
import { PompistesModule } from 'src/pompistes/pompistes.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Conversion.name,
      schema: ConversionSchema
    }
  ]),
  PompistesModule],
  controllers: [ConversionsController],
  providers: [ConversionsService],
})
export class ConversionsModule {}
