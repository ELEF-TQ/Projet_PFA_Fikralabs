import { Module } from '@nestjs/common';
import { PompistesController } from './pompistes.controller';
import { PompisteService } from './pompistes.service';

@Module({
  controllers: [PompistesController],
  providers: [PompisteService],
})
export class PompistesModule {}
