import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.resetPasswordService.resetPassword(resetPasswordDto);
    if(result === null){
      throw new BadRequestException('Invalid or expired verification code.');
    }
    return result;
  }

  @Post("email")
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.resetPasswordService.forgotPassword(forgotPasswordDto);
    if(result === null){
      throw new BadRequestException("Email invalid");
    }
    return result;
  }

}
