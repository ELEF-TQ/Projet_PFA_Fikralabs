import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger, UsePipes, ValidationPipe, HttpException, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { PompistesService } from './pompistes.service';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';
import { DeleteMultipleDto } from './dto/delete-multiple.dto';
import { Pompiste } from './schemas/pompiste.schema';

@Controller('pompistes')
export class PompistesController {
  constructor(private readonly pompistesService: PompistesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPompisteDto: CreatePompisteDto) {
    return this.pompistesService.create(createPompisteDto);
  }

  @Get()
  async findAll() {
    const pompistes = await this.pompistesService.findAll();
    if(pompistes.length === 0){
      throw new NotFoundException("Aucun pompiste pour le moment");
    }else{
      return pompistes;
    }
  }

  @Get(':matriculeRH') 
  async findOne(@Param('matriculeRH') matriculeRH: string) { 
    const pompisteFound = await this.pompistesService.findOne(matriculeRH);
    if (!pompisteFound){
      throw new NotFoundException("Aucun pompiste trouvé avec ce matriculeRH")
    }else{
      return pompisteFound;
    }
  }

  
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updatePompisteDto: UpdatePompisteDto) {
    const pompisteFound = await this.pompistesService.update(id, updatePompisteDto);
    if(!pompisteFound){
      throw new NotFoundException("Aucun pompiste avec cet ID");
    }else{
      return {
        message: "pompiste mise à jour avec success",
        updatedUser: pompisteFound,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedPompiste = await this.pompistesService.remove(id);
    if(!deletedPompiste){
      throw new NotFoundException("No User Found To Delete");
    }else{
      return {
        message: "User Deleted Successfully",
        deletedUser: deletedPompiste
      };
    }
  }


  @Post('/destroy')
  async deleteMultiple(@Body() deleteMultipleDto: DeleteMultipleDto): Promise<Pompiste[]> {
    const { ids } = deleteMultipleDto;
    const deletedPompistes = await this.pompistesService.destroy(ids);
    if(deletedPompistes.length === 0){
      throw new NotFoundException("Aucun pompiste n'est supprimmé")
    }else{
      return deletedPompistes;
    }
  }

  
  
  
}
