import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { UpdateMultipleDto } from './dto/update-conversion.dto';
// import { CreateConversionDto } from './dto/create-conversion.dto';
// import { UpdateConversionDto } from './dto/update-conversion.dto';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post(":id")
  async create(@Param("id") pompisteId: string) {
    return await this.conversionsService.create(pompisteId);
  }

  @Get()
  findAll() {
    return this.conversionsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.conversionsService.findOne(id);
  // }

  @Patch('/acceptOne/:id')
  acceptOne(@Param('id') id: string) {
    return this.conversionsService.acceptOne(id);
  }

  @Patch("/acceptAll")
  async acceptAll(@Body() updateMultipleDto: UpdateMultipleDto) {
    try {
      const { ids } = updateMultipleDto;
      console.log(ids)
      const updatedConversions = await this.conversionsService.acceptAll(ids);
      return { success: true, data: updatedConversions };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.conversionsService.findOne(id);
   }

 

  @Get('/ByPompiste/:id')
  findAllByPompiste(@Param('id') pompisteId:string){
    return this.conversionsService.findAllByPompiste(pompisteId);
  }

}
