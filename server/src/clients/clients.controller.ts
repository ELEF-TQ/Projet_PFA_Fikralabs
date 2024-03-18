import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common'; // Import ParseIntPipe
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Coupon } from 'src/coupons/Schemas/coupon.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateClientProfileDto } from './dto/update-client-profile.dto';


@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  create(@UploadedFile() image:File,@Body() createclientDto: CreateClientDto) {
    const clientDataWithImage = { ...createclientDto, image: image };
    return this.clientsService.create(clientDataWithImage);
  }

  @Get()
  async findAll() {
    const users = await this.clientsService.findAll();
    if(users.length === 0){
      throw new HttpException("No Users Found",404);
    }else{
      return users;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return await this.clientsService.findOne(id);
  }


  @Post("updateProfile/:id")
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  async updateProfile(@Param('id') id: string, @UploadedFile() image:File ,@Body() updateProfileDto: UpdateClientProfileDto) {
    const clientDataWithImage = { ...updateProfileDto, image: image };
    return await this.clientsService.updateProfileClient(id, clientDataWithImage);
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.clientsService.remove(id);
    if(!deletedUser){
      throw new HttpException("No User Found To Delete",404)
    }else{
      return {
        message: "User Deleted Successfully",
        deletedUser: deletedUser
      };
    }
  }

  @Get('phone/:phone')
  async checkClient(@Param('phone') phone: string) {
    try {
      await this.clientsService.getClientByPhone(phone);
      return 'Ce numéro de téléphone existe.';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  
  @Get(':clientId/coupons')
  async getClientReservedCoupons(@Param('clientId') clientId: string): Promise<Coupon[]> {
    return await this.clientsService.findReservedCouponsByClientId(clientId);
  }





  @Post('updateData/:id')
  @UsePipes(ValidationPipe) 
  @UseInterceptors(FileInterceptor('image')) 
  async update(
    @Param('id') id: string, 
    @UploadedFile() image: File, 
    @Body() updateClientDto: UpdateClientDto, 
  ) {
    const pompisteDataWithImage = { ...updateClientDto, image: image };
    return this.clientsService.update(id, pompisteDataWithImage);
  }
}
