import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Body() authPayload: AuthPayloadDto, @Req() req){
      return {
        email: req.body.email,
        JWT: req.user
      };
  }

  // @Get("status")
  // @UseGuards(JwtAuthGuard)
  // getStatus(@Req() req){
  //     console.log("inside authcontroller getStatus()");
  //     console.log(req.user)
  //     return req.user;
  // }
  
}
