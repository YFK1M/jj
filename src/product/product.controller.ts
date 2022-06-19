import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from '../schemas/product.schema';
import { SetProductImageDto } from './dto/setProductImage.dto';
import { ProductImage } from '../schemas/productImage.schema';
import { CreateProductsTypeDto } from './dto/createProductsType.dto';
import { ProductsType } from '../schemas/productsType.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  getAllProductsWithRelations() {
    return this.productService.getAllProductsWithRelations();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | void> {
    return this.productService.create(createProductDto);
  }

  @Post('type/create')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createProductsType(
    @Body() createProductsTypeDto: CreateProductsTypeDto,
  ): Promise<ProductsType | void> {
    return this.productService.createType(createProductsTypeDto);
  }

  @Get('/get-one/:id')
  getProduct(@Param('id') id: string): Promise<Product | void> {
    return this.productService.findProductById(id);
  }

  @Get('/all-types')
  getAllProductsTypes(): Promise<ProductsType | void> {
    return this.productService.getAllProductsTypes();
  }

  @Get('/products-by-type/:id')
  getByProductTypeId(@Param('id') id: string): Promise<Product | void> {
    return this.productService.findProductsByProductTypeId(id);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string): Promise<Product | void> {
    return this.productService.deleteProduct(id);
  }

  @Delete('type/:id')
  deleteProductsType(@Param('id') id: string): Promise<ProductsType | void> {
    return this.productService.deleteProductsType(id);
  }

  @Delete('delete-image/:id')
  deleteProductImage(@Param('id') id: string): Promise<ProductImage | void> {
    return this.productService.deleteProductImage(id);
  }

  @Post('add-product-image')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  addProductImage(
    @Body() setProductImageDto: SetProductImageDto,
  ): Promise<ProductImage | void> {
    return this.productService.addProductImage(setProductImageDto);
  }
}
