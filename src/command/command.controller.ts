import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Command } from 'src/schemas/command.schema';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Get()
  getAll(): Promise<Command[] | void> {
    return this.commandService.getAll();
  }

  @Get(':id')
  getCommand(@Param('id') id: string): Promise<Command | void> {
    return this.commandService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createCommand(@Body() createCommandDto: CreateCommandDto): Promise<Command | void> {
    return this.commandService.create(createCommandDto);
  }

  @Delete(':id')
  removeCommand(@Param('id') id: string): Promise<Command | void> {
    return this.commandService.remove(id);
  }

  @Put(':id')
  updateCommand(@Body() updateCommandDto: UpdateCommandDto, @Param('id') id: string): Promise<Command | void> {
    return this.commandService.update(id, updateCommandDto);
  }
}
