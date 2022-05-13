import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { News } from 'src/schemas/news.schema';
import { NewsImage } from 'src/schemas/newsImage.schema';
import { CreateNewsImageDto } from './dto/create-news-image.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { logger } from './news.module';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAll(): Promise<News[] | void> {
    return this.newsService.getAll();
  }

  @Get(':id')
  getNews(@Param('id') id: string): Promise<News | void> {
    return this.newsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createNews(@Body() createNewsDto: CreateNewsDto): Promise<News | void> {
    return this.newsService.createNews(createNewsDto);
  }

  @Post('image')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createNewsImage(@Body() createNewsImageDto: CreateNewsImageDto): Promise<NewsImage | void> {
    return this.newsService.createImage(createNewsImageDto);
  }

  @Delete(':id')
  removeNews(@Param('id') id: string): Promise<News | void> {
    return this.newsService.removeNews(id);
  }

  @Delete('image/:id')
  removeImage(@Param('id') id: string): Promise<NewsImage | void> {
    return this.newsService.removeImage(id);
  }

  @Put(':id')
  updateNews(@Body() updateNewsDto: UpdateNewsDto, @Param('id') id: string): Promise<News | void> {
    return this.newsService.updateNews(id, updateNewsDto);
  }
}
