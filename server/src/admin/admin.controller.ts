import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll() {
    const admins = await this.adminService.findAll();
    if(admins.length === 0){
      throw new HttpException("No Admins Found", 404);
    }else{
      return admins;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      const adminFound = await this.adminService.findOne(id);
      if(!adminFound){
        throw new HttpException("The admin with the provided ID doesn't exist", HttpStatus.NOT_FOUND);
      }else{
          return adminFound;
      }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
      const adminFound = await this.adminService.update(id, updateAdminDto);
      if(!adminFound){
        throw new HttpException("The admin with the provided ID doesn't exist", HttpStatus.NOT_FOUND);
      }else{
          return {
            message: "Admin Updated Successfully",
            updatedAdmin: adminFound
          };
      }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedAdmin = await this.adminService.remove(id);
    if(!deletedAdmin){
      throw new HttpException("No Admin Found To Delete", 404)
    }else{
      return {
        message: "Admin Deleted Successfully",
        deletedAdmin: deletedAdmin
      };
    }
  }
}
