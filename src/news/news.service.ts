import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from 'src/schemas/news.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsImage, NewsImageDocument } from 'src/schemas/newsImage.schema';
import { logger } from './news.module';
import { CreateNewsImageDto } from './dto/create-news-image.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    @InjectModel(NewsImage.name)
    private newsImageModel: Model<NewsImageDocument>,
  ) {}

  async getAll(): Promise<News[] | void> {
    try {
      return this.newsModel
        .find()
        .populate<{ newsImage: NewsImage }>('newsImage')
        .then((newsArray) =>
          newsArray.map((news) => news.toJSON({ virtuals: true })),
        )
        .catch((err) => logger.error('Service.getAll', err));
    } catch (err) {
      return logger.error('Service.getAll', err);
    }
  }

  async getById(id: string): Promise<News | void> {
    try {
      return this.newsModel
        .findById(id)
        .populate<{ newsImage: NewsImage }>('newsImage')
        .then((news) => news.toJSON({ virtuals: true }))
        .catch((err) => logger.error('Service.getById', err));
    } catch (err) {
      return logger.error('Service.getById', err);
    }
  }

  async getImageById(player_id: string): Promise<NewsImage[] | void> {
    try {
      return this.newsImageModel.find({ player_id: player_id });
    } catch (err) {
      return logger.error('Service.getImageById', err);
    }
  }

  async createNews(newsDto: CreateNewsDto): Promise<News | void> {
    try {
      const newNews = new this.newsModel(newsDto);
      return newNews.save();
    } catch (err) {
      return logger.error('Service.createNews', err);
    }
  }

  async createImage(
    newsImageDto: CreateNewsImageDto,
  ): Promise<NewsImage | void> {
    try {
      const newNewsImage = new this.newsImageModel(newsImageDto);
      return newNewsImage.save();
    } catch (err) {
      return logger.error('Service.createImage', err);
    }
  }

  async removeNews(id: string): Promise<News | void> {
    try {
      return this.newsModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('Service.removeNews', err);
    }
  }

  async removeImage(id: string): Promise<NewsImage | void> {
    try {
      return this.newsImageModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('Service.removeImage', err);
    }
  }

  async updateNews(id: string, newsDto: UpdateNewsDto): Promise<News | void> {
    try {
      return this.newsModel.findByIdAndUpdate(id, newsDto, { new: true });
    } catch (err) {
      return logger.error('Service.updateNews', err);
    }
  }
}
