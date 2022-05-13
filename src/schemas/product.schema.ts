import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  price: number;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('productImage', {
  ref: 'ProductImage',
  localField: '_id',
  foreignField: 'product_id',
});
