import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Logger, UsePipes, ValidationPipe, HttpException, HttpStatus, NotFoundException, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PompistesService } from './pompistes.service';
import { CreatePompisteDto } from './dto/create-pompiste.dto';
import { UpdatePompisteDto } from './dto/update-pompiste.dto';
import { DeleteMultipleDto } from './dto/delete-multiple.dto';
import { Pompiste } from './schemas/pompiste.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePompisteProfileDto } from './dto/update-pompiste-profile.dto';

@Controller('pompistes')
export class PompistesController {
  constructor(private readonly pompistesService: PompistesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  create(@UploadedFile() image:File ,@Body() createPompisteDto: CreatePompisteDto) {
    const pompisteDataWithImage = { ...createPompisteDto, image: image };
    return this.pompistesService.create(pompisteDataWithImage);
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

  @Get('matriculeRH/:matriculeRH') 
  async findByMatriculeRH(@Param('matriculeRH') matriculeRH: string) { 
    const pompisteFound = await this.pompistesService.getPompisteByMatriculeRH(matriculeRH);
    if (!pompisteFound){
      throw new NotFoundException("Aucun pompiste trouvé avec ce matriculeRH")
    }else{
      return pompisteFound;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return await this.pompistesService.findOne(id);
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

  @Post("updateProfile/:id")
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  updateProfile(@Param('id') id: string, @UploadedFile() image:File ,@Body() updateProfileDto: UpdatePompisteProfileDto) {
    const pompisteDataWithImage = { ...updateProfileDto, image: image };
    return this.pompistesService.updateProfilePompiste(id, pompisteDataWithImage);
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
