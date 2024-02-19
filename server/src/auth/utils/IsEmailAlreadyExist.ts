import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { AdminService } from "src/admin/admin.service";

export async function IsEmailAlreadyExists(userDetails: CreateUserDto, usersService: UsersService, adminService: AdminService): Promise<boolean> {
    const userFound = await usersService.findOneByEmail(userDetails.email);
    const adminFound = await adminService.findOneByEmail(userDetails.email);
    if(userFound || adminFound){
        return true;
    }else{
        return false;
    }
}