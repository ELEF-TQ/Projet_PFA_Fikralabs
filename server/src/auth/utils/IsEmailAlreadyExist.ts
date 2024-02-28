import { CreateClientDto } from "src/clients/dto/create-client.dto";
import { ClientsService } from "src/clients/clients.service";
import { AdminService } from "src/admin/admin.service";

export async function IsEmailAlreadyExists(userDetails: CreateClientDto, usersService: ClientsService, adminService: AdminService): Promise<boolean> {
    const userFound = await usersService.findOneByEmail(userDetails.email);
    const adminFound = await adminService.findOneByEmail(userDetails.email);
    if(userFound || adminFound){
        return true;
    }else{
        return false;
    }
}