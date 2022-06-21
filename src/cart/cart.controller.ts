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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/createCart.dto';
import { Cart } from '../schemas/cart.schema';
import { AddProductToCustomerCartDto } from './dto/addProductToCustomerCart.dto';
import { ChangeProductAmountDto } from './dto/changeProductAmount.dto';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';
import {AddTicketToCustomerCartDto} from "./dto/addTicketToCustomerCart.dto";

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create-customer-cart')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createCart(@Body() createCartDto: CreateCartDto): Promise<Cart | void> {
    return this.cartService.create(createCartDto);
  }

  @Delete('delete-customer-cart/:user_id')
  deleteCustomerCart(@Param('user_id') user_id: string): Promise<Cart | void> {
    return this.cartService.removeCustomerCart(user_id);
  }

  @Post('add-product-to-cart')
  addProductToCart(
    @Body() addProductToCustomerCartDto: AddProductToCustomerCartDto,
  ): Promise<Cart> {
    return this.cartService.addProductToCart(addProductToCustomerCartDto);
  }
  @Post('add-ticket-to-cart')
  addTicketToCart(
    @Body() addTicketToCustomerCartDto: AddTicketToCustomerCartDto,
  ): Promise<Cart> {
    return this.cartService.addTicketToCart(addTicketToCustomerCartDto);
  }

  @Post('remove-product-from-cart')
  removeProductFromCart(
    @Body() removeProductFromCartDto: RemoveProductFromCartDto,
  ): Promise<Cart> {
    return this.cartService.removeProductFromCart(removeProductFromCartDto);
  }

  @Post('change-product-amount-in-cart')
  changeProductAmountInCart(
    @Body() changeProductAmountDto: ChangeProductAmountDto,
  ): Promise<Cart> {
    return this.cartService.changeProductAmountInCart(changeProductAmountDto);
  }

  @Get('get-customer-cart/:user_id')
  getCustomerCartWithRelations(
    @Param('user_id') user_id: string,
  ): Promise<any> {
    return this.cartService.getCustomerCartWithRelations(user_id);
  }
}
