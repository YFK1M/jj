import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, Product } from '../schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { logger } from './product.module';
import {
  ProductImage,
  ProductImageDocument,
} from '../schemas/productImage.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductImage.name)
    private productImageModel: Model<ProductImageDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    try {
      return this.productModel.create(createProductDto);
    } catch (err) {
      return logger.error(`Service. Err: ${JSON.stringify(err)}`);
    }
  }

  async findProductById(id: number): Promise<Product | void> {
    try {
      return this.productModel.findById(id).populate('productImage');
    } catch (err) {
      return logger.error(`Service. Err: ${JSON.stringify(err)}`);
    }
  }

  async deleteProduct(id: number): Promise<Product | void> {
    try {
      return this.productModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error(`Service. Err: ${JSON.stringify(err)}`);
    }
  }
}
