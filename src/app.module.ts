import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://yfk1m:1234@cluster0.mxaga.mongodb.net/matches?retryWrites=true&w=majority`,
    ),
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
