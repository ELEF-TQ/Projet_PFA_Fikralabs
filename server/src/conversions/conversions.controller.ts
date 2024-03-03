import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post()
  create(@Body() createConversionDto: CreateConversionDto) {
    return this.conversionsService.create(createConversionDto);
  }

  @Get()
  findAll() {
    return this.conversionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversionDto: UpdateConversionDto) {
    return this.conversionsService.update(+id, updateConversionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversionsService.remove(+id);
  }
}
