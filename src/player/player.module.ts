import { Logger, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerImageController } from './player-image/player-image.controller';
import { PlayerImageModule } from './player-image/player-image.module';

export const logger = new Logger('PlayerModule');

@Module({
  controllers: [PlayerController, PlayerImageController],
  providers: [PlayerService],
  imports: [PlayerImageModule],
})
export class PlayerModule {}
