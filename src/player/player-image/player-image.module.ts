import { Module } from '@nestjs/common';
import { PlayerImageService } from './player-image.service';

@Module({
  providers: [PlayerImageService]
})
export class PlayerImageModule {}
