import { Logger, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from '../schemas/product.schema';
import { ProductImage } from '../schemas/productImage.schema';

export const logger = new Logger('ProductModule');

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: Product },
      { name: ProductImage.name, schema: ProductImage },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
