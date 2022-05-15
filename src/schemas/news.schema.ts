import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.virtual('newsImage', {
  ref: 'NewsImage',
  localField: '_id',
  foreignField: 'news_id',
});
