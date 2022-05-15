import { Injectable } from '@nestjs/common';
import { logger } from './user.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ROLES } from 'src/constants/user/userConstants';

@Injectable()
export class UserService {
    constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<User[] | void> {
    return this.userModel.find()
      .catch((err) => logger.error('Service.getAll', err));
  }

  async getById(id: string): Promise<User | void> {
    return this.userModel.findById(id)
      .catch((err) => logger.error('Service.getById', err));
  }

  async create(userDto: CreateUserDto): Promise<User | void> {
    const newUser = new this.userModel({
        ...userDto,
        role: USER_ROLES.USER
    })
    return newUser.save()
      .catch((err) => logger.error('Service.create', err));
  }

  async remove(id: string): Promise<User | void> {
    return this.userModel.findByIdAndRemove(id)
      .catch((err) => logger.error('Service.remove', err));
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User | void> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true })
      .catch((err) => logger.error('Service.update', err));
  }
}
