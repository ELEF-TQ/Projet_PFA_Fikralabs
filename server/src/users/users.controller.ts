import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common'; // Import ParseIntPipe
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    if(users.length === 0){
      throw new HttpException("No Users Found",404)
    }else{
      return users;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) { 
    const userFound = await this.usersService.findOne(id);
    if(!userFound){
      throw new HttpException("The User with the provided ID doesn't exist", HttpStatus.NOT_FOUND);
    }else{
        return userFound;
    }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userFound = await this.usersService.update(id, updateUserDto);
    if(!userFound){
      throw new HttpException("The User with the provided ID doesn't exist", HttpStatus.NOT_FOUND);
    }else{
        return {
          message: "User Updated Successfully",
          updatedUser: userFound,
        };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(id);
    if(!deletedUser){
      throw new HttpException("No User Found To Delete",404)
    }else{
      return {
        message: "User Deleted Successfully",
        deletedUser: deletedUser
      };
    }
  }
}
