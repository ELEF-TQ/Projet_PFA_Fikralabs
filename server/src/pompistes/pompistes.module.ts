import { Module } from '@nestjs/common';
import { PompistesController } from './pompistes.controller';
import { PompisteService } from './pompistes.service';
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
  providers: [PompisteService],
})
export class PompistesModule {}
