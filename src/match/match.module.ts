import { Logger, Module } from '@nestjs/common';
import { MatchesService } from './match.service';
import { MatchesController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from '../schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
export const logger = new Logger('MatchService');
