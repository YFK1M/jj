import { Logger, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from 'src/schemas/news.schema';
import { NewsImage, NewsImageSchema } from 'src/schemas/newsImage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: NewsImage.name, schema: NewsImageSchema }
    ]),
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
export const logger = new Logger('NewsService');
