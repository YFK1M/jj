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
  createPlayer(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | void> {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Promise<Product | void> {
    return this.productService.findProductById(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product | void> {
    return this.productService.deleteProduct(id);
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
