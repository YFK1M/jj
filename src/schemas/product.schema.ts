import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  price: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ProductDocument = SchemaFactory.createForClass(Product);
