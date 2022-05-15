import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[] | void> {
    return this.userService.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<User | void> {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User | void> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<User | void> {
    return this.userService.remove(id);
  }

  @Put(':id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User | void> {
    return this.userService.update(id, updateUserDto);
  }
}
