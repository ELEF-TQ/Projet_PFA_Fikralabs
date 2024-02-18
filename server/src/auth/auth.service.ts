import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Import your users service
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inject your users service
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if(!user){
      return null;
    }else if(user.password === password){
      const {password, ...userDetails} = user;
      return this.jwtService.sign(userDetails);
    }
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
