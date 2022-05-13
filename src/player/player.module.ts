import { Logger, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

export const logger = new Logger('PlayerModule');

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
