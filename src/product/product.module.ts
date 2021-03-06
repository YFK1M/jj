import { Logger, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product.schema';
import {
  ProductImage,
  ProductImageSchema,
} from '../schemas/productImage.schema';
import {
  ProductsType,
  ProductsTypeSchema,
} from '../schemas/productsType.schema';

export const logger = new Logger('ProductModule');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
      { name: ProductsType.name, schema: ProductsTypeSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
