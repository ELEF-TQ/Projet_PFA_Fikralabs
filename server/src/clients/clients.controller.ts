import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common'; // Import ParseIntPipe
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Coupon } from 'src/coupons/Schemas/coupon.schema';


@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createclientDto: CreateClientDto) {
    return this.clientsService.create(createclientDto);
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



  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateClientDto) {
    const userFound = await this.clientsService.update(id, updateUserDto);
    if(!userFound){
      throw new HttpException("The User with the provided ID doesn't exist", HttpStatus.NOT_FOUND);
    }else{
        return {
          message: "User Updated Successfully",
          updatedUser: userFound,
        };
    }
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
}
