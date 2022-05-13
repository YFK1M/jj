import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const NewsDocument = SchemaFactory.createForClass(News);
