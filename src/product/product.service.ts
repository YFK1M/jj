import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { logger } from './product.module';
import {
  ProductImage,
  ProductImageDocument,
} from '../schemas/productImage.schema';
import { SetProductImageDto } from './dto/setProductImage.dto';
import { CreateProductsTypeDto } from './dto/createProductsType.dto';
import {
  ProductsType,
  ProductsTypeDocument,
} from '../schemas/productsType.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductsType.name)
    private productsTypeModel: Model<ProductsTypeDocument>,
    @InjectModel(ProductImage.name)
    private productImageModel: Model<ProductImageDocument>,
  ) {}

  async getAllProductsWithRelations(): Promise<any> {
    try {
      return await this.productModel
        .find({})
        .populate<{ productImage: ProductImage }>('productImage')
        .then((products) => {
          return products.map((product) => product.toJSON({ virtuals: true }));
        });
    } catch (err) {
      return logger.error('service.getAllProductsWithRelations', err);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product | void> {
    try {
      return this.productModel.create(createProductDto);
    } catch (err) {
      return logger.error('service.create', err);
    }
  }

  async createType(
    createProductsTypeDto: CreateProductsTypeDto,
  ): Promise<ProductsType | void> {
    try {
      return this.productsTypeModel.create(createProductsTypeDto);
    } catch (err) {
      return logger.error('service.createType', err);
    }
  }

  async findProductById(id: string): Promise<Product | void> {
    try {
      return this.productModel
        .findById(id)
        .populate<{ productImage: ProductImage }>('productImage')
        .then((product) => product.toJSON({ virtuals: true }));
    } catch (err) {
      return logger.error('service.findProductById', err);
    }
  }

  async getAllProductsTypes(): Promise<any> {
    try {
      return this.productsTypeModel.find();
    } catch (err) {
      return logger.error('Service.getAll', err);
    }
  }

  async findProductsByProductTypeId(id: string): Promise<any> {
    try {
      return this.productModel
        .find({ productsType_id: id })
        .populate<{ productImage: ProductImage }>('productImage')
        .then((products) => {
          return products.map((product) => product.toJSON({ virtuals: true }));
        });
    } catch (err) {
      return logger.error('service.findProductById', err);
    }
  }

  async deleteProduct(id: string): Promise<Product | void> {
    try {
      return this.productModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('service.deleteProduct', err);
    }
  }

  async deleteProductsType(id: string): Promise<ProductsType | void> {
    try {
      return this.productModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('service.deleteProductsType', err);
    }
  }

  async deleteProductImage(id: string): Promise<ProductImage | void> {
    try {
      return this.productImageModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error('service.deleteProductImage', err);
    }
  }

  async addProductImage(
    setProductImageDto: SetProductImageDto,
  ): Promise<ProductImage | void> {
    try {
      return this.productImageModel.create(setProductImageDto);
    } catch (err) {
      return logger.error('service.setProductImage', err);
    }
  }
}
