import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordController } from '../../reset-password/reset-password.controller';
import { ResetPasswordService } from '../../reset-password/reset-password.service';
import { BadRequestException } from '@nestjs/common';
import { ResetPasswordDto } from '../../reset-password/dto/resetPassword.dto';
import { ForgotPasswordDto } from '../../reset-password/dto/forgotPassword.dto';

describe('ResetPasswordController', () => {
  let controller: ResetPasswordController;
  let service: ResetPasswordService;

  const mockResetPasswordService = {
    resetPassword: jest.fn(),
    forgotPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        { provide: ResetPasswordService, useValue: mockResetPasswordService },
      ],
    }).compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
    service = module.get<ResetPasswordService>(ResetPasswordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('resetPassword', () => {
    it('should return a result when the resetPassword service returns a valid result', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        code: 'validCode',
        password: 'newPassword123',
      };
      
      mockResetPasswordService.resetPassword.mockResolvedValue('Success');

      const result = await controller.resetPassword(resetPasswordDto);
      expect(result).toBe('Success');
      expect(service.resetPassword).toHaveBeenCalledWith(resetPasswordDto);
    });

    it('should throw BadRequestException when resetPassword service returns null', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        code: 'invalidCode',
        password: 'newPassword123',
      };

      mockResetPasswordService.resetPassword.mockResolvedValue(null);

      await expect(controller.resetPassword(resetPasswordDto)).rejects.toThrowError(
        new BadRequestException('Invalid or expired verification code.')
      );
    });
  });

  describe('forgotPassword', () => {
    it('should return a result when forgotPassword service returns a valid result', async () => {
      const forgotPasswordDto: ForgotPasswordDto = { email: 'user@example.com' };

      mockResetPasswordService.forgotPassword.mockResolvedValue('Password reset link sent.');

      const result = await controller.forgotPassword(forgotPasswordDto);
      expect(result).toBe('Password reset link sent.');
      expect(service.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto);
    });

    it('should throw BadRequestException when forgotPassword service returns null', async () => {
      const forgotPasswordDto: ForgotPasswordDto = { email: 'invalid@example.com' };

      mockResetPasswordService.forgotPassword.mockResolvedValue(null);

      await expect(controller.forgotPassword(forgotPasswordDto)).rejects.toThrowError(
        new BadRequestException('Email invalid')
      );
    });
  });
});
