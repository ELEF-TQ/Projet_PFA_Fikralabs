import { Controller, Get, Post, Body, UseGuards, Req, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { Request } from 'express';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesEnum } from 'src/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request){
    return {
      data: req.user
    };
  }

  @Post("signup")
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) 
  async signup(@UploadedFile() image:File, @Body() userDetails: CreateClientDto) {
     const userDataWithImage = { ...userDetails, image: image };
    return this.authService.register(userDataWithImage);
  }






  // @Get("status")
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
  // getStatus(@Req() req){
  //     console.log("inside authcontroller getStatus()");
  //     console.log(req.user)
  //     return req.user;
  // }
  
}
