import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { AuthService } from "../auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if(request?.user){
            const { _id } = request.user;
            console.log(request.user)
            const user = await this.authService.findOneById(_id);
            console.log(user)
            const isRoleIncluded = roles.includes(user.role);
            return isRoleIncluded;
        }else{
            return false;
        }
    }
}