import { Logger, Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from '../schemas/player.schema';
import { PlayerImage, PlayerImageSchema } from '../schemas/playerImage.schema';

export const logger = new Logger('PlayerModule');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    MongooseModule.forFeature([
      { name: PlayerImage.name, schema: PlayerImageSchema },
    ]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
