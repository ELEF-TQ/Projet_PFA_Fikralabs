import { BadRequestException, Injectable } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResetPassword } from './schemas/reset-password.schema';
import { Model } from 'mongoose';
import { ClientsService } from 'src/clients/clients.service';
import { AdminService } from 'src/admin/admin.service';
import { PompistesService } from 'src/pompistes/pompistes.service';
import { Client } from 'src/clients/schemas/client.schema';
import { Admin } from 'src/admin/schemas/admin.schema';
import { Pompiste } from 'src/pompistes/schemas/pompiste.schema';
import { generateVerificationCode } from './utils/generateVerificationCode';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { encodePassword } from 'src/auth/utils/bcrypt';
import { RolesEnum } from 'src/enums/roles.enum';

@Injectable()
export class ResetPasswordService {

  constructor(@InjectModel(ResetPassword.name) private readonly resetPasswordModel: Model<ResetPassword>,
              private clientsService: ClientsService,
              private adminService: AdminService,
              private pompistesService : PompistesService,
  ){}

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const {email} = forgotPasswordDto;
    const verifiedEmail = await this.EmailVerification(email);
    if(!verifiedEmail){
      return null;
    }
    const role = verifiedEmail.role;
    let validationCode: string;
    let isUniqueCode = false;
    while(!isUniqueCode){
      validationCode = generateVerificationCode();
      const isCodeExist = await this.resetPasswordModel.findOne({ code: validationCode }).exec();
      if(!isCodeExist){
        isUniqueCode = true;
      }
    }
    const resetPassword = new this.resetPasswordModel({ email, code: validationCode, role });
    await this.sendVerificationCodeByEmail(email, validationCode);
    const savedResetPasswordEntry =  await resetPassword.save();
    const {code, ...savedResetPasswordWithoutCode} = savedResetPasswordEntry.toObject();
    return savedResetPasswordWithoutCode;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { code, password } = resetPasswordDto;
    const resetPasswordEntry = await this.resetPasswordModel.findOne({ code });
    if (!resetPasswordEntry) {
      return null;
    }
    const hashedPassword = encodePassword(password);
    let updatedUser: any;
    switch(resetPasswordEntry.role){
      case RolesEnum.CLIENT:
        updatedUser = await this.clientsService.updatePassword(resetPasswordEntry.email, hashedPassword);
        break;
      case RolesEnum.POMPISTE:
        updatedUser = await this.pompistesService.updatePassword(resetPasswordEntry.email, hashedPassword);
        break;
      case RolesEnum.ADMIN:
        updatedUser = await this.adminService.updatePassword(resetPasswordEntry.email, hashedPassword);
        break;
      default:
        break;
    }
    await resetPasswordEntry.deleteOne();
    return { message: 'Password successfully updated.', user: updatedUser };
  }

  

  async EmailVerification(email: string): Promise<Client | Admin | Pompiste | null> {
    const userClient = await this.clientsService.findOneByEmail(email);
    if (userClient) {
      return userClient;
    }
  
    const userAdmin = await this.adminService.findOneByEmail(email);
    if (userAdmin) {
      return userAdmin;
    }
  
    const userPompiste = await this.pompistesService.findOneByEmail(email);
    if (userPompiste) {
      return userPompiste;
    }
  
    return null;
  }

  async sendVerificationCodeByEmail(email: string, code: string) {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'asmbn333@gmail.com', // Adresse e-mail depuis laquelle vous souhaitez envoyer l'e-mail
        pass: 'huvi xekf evaq dvxi', // Mot de passe de l'adresse e-mail
      },
    });

    let mailOptions = {
      from: 'asmbn333@gmail.com',
      to: email,
      subject: 'Code de vérification',
      text: `Votre code de vérification est : ${code}`,
    };

    await transporter.sendMail(mailOptions);
  }

}
