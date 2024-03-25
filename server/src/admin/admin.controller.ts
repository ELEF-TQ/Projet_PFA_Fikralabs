import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';


@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  create(@UploadedFile() image:File ,@Body() createAdminDto: CreateAdminDto) {
    const adminDataWithImage = { ...createAdminDto, image: image };
    console.log(adminDataWithImage);
    return this.adminService.create(adminDataWithImage);
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
        throw new HttpException("L'administrateur avec l'identifiant fourni n'existe pas", HttpStatus.NOT_FOUND);
      }else{
          return adminFound;
      }
  }
  @Post('updateData/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  async update(@Param('id') id: string, @UploadedFile() image:File, @Body() updateAdminDto: UpdateAdminDto) {
    const adminDataWithImage = { ...updateAdminDto, image: image };
    return this.adminService.update(id, adminDataWithImage);
  }

  
 
  

  @Post("updateProfile/:id")
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  updateProfile(@Param('id') id: string, @UploadedFile() image:File ,@Body() updateProfileDto: UpdateAdminProfileDto) {
    const adminDataWithImage = { ...updateProfileDto, image: image };
    return this.adminService.updateProfileAdmin(id, adminDataWithImage);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedAdmin = await this.adminService.remove(id);
    if(!deletedAdmin){
      throw new HttpException("Aucun administrateur trouvé", HttpStatus.BAD_REQUEST)
    }else{
      return {
        message: "Administrateur supprimé avec succès",
        deletedAdmin: deletedAdmin
      };
    }
  }
}
