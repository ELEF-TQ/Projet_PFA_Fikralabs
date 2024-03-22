import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.resetPasswordService.resetPassword(resetPasswordDto);
    return result;
  }

  @Post("email")
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.resetPasswordService.forgotPassword(forgotPasswordDto);
    return result;
  }

}
