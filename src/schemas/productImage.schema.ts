import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { Product } from './product.schema';

export type ProductImageDocument = ProductImage & Document;

@Schema()
export class ProductImage {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop()
  image_url: string;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
