import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ResetPasswordController } from '../../reset-password/reset-password.controller';
import { ResetPasswordService } from '../../reset-password/reset-password.service';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('ResetPasswordController', () => {
  let app: INestApplication;
  let resetPasswordService: ResetPasswordService;

  const resetPasswordDto = {
    code: 'validCode123',
    password: 'newPassword123',
  };
  const result = { message: 'Password successfully updated.', user: { email: 'user@example.com' } }
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        {
          provide: ResetPasswordService,
          useValue: {
            resetPassword: jest.fn().mockResolvedValue({
              message: 'Password successfully updated.',
              user: { email: 'user@example.com' },
            }),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    resetPasswordService = module.get<ResetPasswordService>(ResetPasswordService);
  });
  it('should reset password successfully with valid code', async () => {
    const response = await request(app.getHttpServer())
      .post('/reset-password')
      .send(resetPasswordDto)
      .expect(result);

    expect(response.body.message).toBe('Password successfully updated.');
    expect(response.body.user.email).toBe('user@example.com');
  });

  it('should return error if code is invalid or expired', async () => {
    jest.spyOn(resetPasswordService, 'resetPassword').mockResolvedValueOnce(null);

    const response = await request(app.getHttpServer())
      .post('/reset-password')
      .send({ code: 'invalidCode', password: 'newPassword123' })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toBe('Invalid or expired verification code.');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('ForgotPasswordController', () => {
    let app: INestApplication;
    let resetPasswordService: ResetPasswordService;
  
    const forgotPasswordDto = {
      email: 'user@example.com',
    };
  
    beforeAll(async () => {
      const module = await Test.createTestingModule({
        controllers: [ResetPasswordController],
        providers: [
          {
            provide: ResetPasswordService,
            useValue: {
              forgotPassword: jest.fn().mockResolvedValue({
                email: 'user@example.com',
                code: 'verificationCode123',
              }),
            },
          },
        ],
      }).compile();
  
      app = module.createNestApplication();
      await app.init();
      resetPasswordService = module.get<ResetPasswordService>(ResetPasswordService);
    });
  
    it('should send a verification code if email is valid', async () => {
      const response = await request(app.getHttpServer())
        .post('/reset-password/email')
        .send(forgotPasswordDto)
        .expect(HttpStatus.CREATED);
  
      expect(response.body.email).toBe('user@example.com');
      expect(response.body.code).toBeDefined();
    });
  
    it('should return error if email is invalid', async () => {
      jest.spyOn(resetPasswordService, 'forgotPassword').mockResolvedValueOnce(null);
  
      const response = await request(app.getHttpServer())
        .post('/reset-password/email')
        .send({ email: 'invalidEmail@example.com' })
        .expect(HttpStatus.BAD_REQUEST);
  
      expect(response.body.message).toBe('Email invalid');
    });
  
    afterAll(async () => {
      await app.close();
    });
  });
  
});
