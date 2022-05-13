import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { News } from './news.schema';

export type NewsImageDocument = NewsImage & Document;

@Schema()
export class NewsImage {
  @Prop({ type: SchemaTypes.ObjectId, ref: News.name })
  news_id: Types.ObjectId;

  @Prop()
  image_url: string;
}

export const NewsImageSchema = SchemaFactory.createForClass(NewsImage);
