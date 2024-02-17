import { Module } from '@nestjs/common';
import { PompistesService } from './pompistes.service';
import { PompistesController } from './pompistes.controller';

@Module({
  controllers: [PompistesController],
  providers: [PompistesService],
})
export class PompistesModule {}
