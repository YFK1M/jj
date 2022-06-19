import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsTypeDocument = ProductsType & Document;

@Schema()
export class ProductsType {
  @Prop()
  title: string;
}

export const ProductsTypeSchema = SchemaFactory.createForClass(ProductsType);
