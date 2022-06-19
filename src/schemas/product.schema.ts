import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ProductsType } from './productsType.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: SchemaTypes.ObjectId, ref: ProductsType.name })
  productsType_id: Types.ObjectId;

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
