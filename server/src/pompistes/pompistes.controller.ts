import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger } from '@nestjs/common';
import { PompistesService } from './pompistes.service';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';

@Controller('pompistes')
export class PompistesController {
  constructor(private readonly pompistesService: PompistesService) {}

  @Post()
  create(@Body() createPompisteDto: CreatePompisteDto) {
    return this.pompistesService.create(createPompisteDto);
  }

  @Get()
  findAll() {
    return this.pompistesService.findAll();
  }

  @Get(':matriculeRH') 
  findOne(@Param('matriculeRH') matriculeRH: string) { 
    return this.pompistesService.findOne(matriculeRH); 
  }

  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePompisteDto: UpdatePompisteDto) {
    return this.pompistesService.update(id, updatePompisteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pompistesService.remove(id);
  }

  
  
  
}
