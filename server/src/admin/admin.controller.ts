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
        throw new HttpException("L'administrateur avec l'identifiant fourni n'existe pas", HttpStatus.NOT_FOUND);
      }else{
          return adminFound;
      }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
      const adminFound = await this.adminService.update(id, updateAdminDto);
      if(!adminFound){
        throw new HttpException("L'administrateur avec l'identifiant fourni n'existe pas", HttpStatus.NOT_FOUND);
      }else{
          return {
            message: "Administrateur mis à jour avec succès",
            updatedAdmin: adminFound
          };
      }
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
