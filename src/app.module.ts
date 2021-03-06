import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchesModule } from './match/match.module';
import { PlayerModule } from './player/player.module';
import { ProductModule } from './product/product.module';
import { TicketModule } from './ticket/ticket.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { CommandModule } from './command/command.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://yfk1m:1234@cluster0.mxaga.mongodb.net/matches?retryWrites=true&w=majority`,
    ),
    MatchesModule,
    PlayerModule,
    TicketModule,
    ProductModule,
    CartModule,
    UserModule,
    NewsModule,
    CommandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
