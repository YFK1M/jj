import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Command, CommandDocument } from 'src/schemas/command.schema';
import { Model } from 'mongoose';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { logger } from './command.module';

@Injectable()
export class CommandService {
  constructor(
    @InjectModel(Command.name) private commandModel: Model<CommandDocument>,
  ) {}

  async getAll(): Promise<Command[] | void> {
    try {
      return this.commandModel.find();
    } catch (err) {
      return logger.error('Service.getAll', err);
    }
  }

  async getById(id: string): Promise<Command | void> {
    try {
      return this.commandModel.findById(id);
    } catch (err) {
      return logger.error('Service.getById', err);
    }
  }

  async create(commandesDto: CreateCommandDto): Promise<Command | void> {
    try {
      const newCommand = new this.commandModel(commandesDto);
      return newCommand.save();
    } catch (err) {
      return logger.error('Service.create', err);
    }
  }

  async remove(id: string): Promise<Command | void> {
    try {
      return this.commandModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('Service.remove', err);
    }
  }

  async update(
    id: string,
    commandDto: UpdateCommandDto,
  ): Promise<Command | void> {
    try {
      return this.commandModel.findByIdAndUpdate(id, commandDto, { new: true });
    } catch (err) {
      return logger.error('Service.update', err);
    }
  }
}
