import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Command, CommandSchema } from 'src/schemas/command.schema';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Command.name, schema: CommandSchema }]),
  ],
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
export const logger = new Logger('CommandService');
