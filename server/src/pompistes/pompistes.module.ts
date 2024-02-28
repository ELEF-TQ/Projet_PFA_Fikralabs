import { Module } from '@nestjs/common';
import { PompistesController } from './pompistes.controller';
import { PompistesService } from './pompistes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pompiste, PompisteSchema } from './schemas/pompiste.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Pompiste.name,
      schema: PompisteSchema
    }
  ])],
  controllers: [PompistesController],
  providers: [PompistesService],
  exports: [PompistesService]
})
export class PompistesModule {}
