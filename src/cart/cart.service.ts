import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { CreateCartDto } from './dto/createCart.dto';
import { AddProductToCustomerCartDto } from './dto/addProductToCustomerCart.dto';
import { ChangeProductAmountDto } from './dto/changeProductAmount.dto';
import { CART_PRODUCT_TYPES } from '../constants/cart/cartConstants';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartModel.create(createCartDto);
  }

  async getCustomerCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ user_id: userId });
  }

  async removeCustomerCart(userId: string): Promise<Cart> {
    return this.cartModel.findOneAndRemove({ user_id: userId });
  }

  async addProductToCart(
    addProductToCustomerCartDto: AddProductToCustomerCartDto,
  ): Promise<any> {
    const userCart = await this.getCustomerCart(
      addProductToCustomerCartDto.user_id,
    );
    const cartProducts = userCart.cart;
    cartProducts.push({
      ...addProductToCustomerCartDto.cartProduct,
      amount: 1,
    });
    return this.cartModel.findOneAndUpdate(
      userCart,
      { userId: userCart.user_id, cart: cartProducts },
      { new: true },
    );
  }

  async removeProductFromCart(
    removeProductFromCartDto: RemoveProductFromCartDto,
  ): Promise<any> {
    const userCart = await this.getCustomerCart(
      removeProductFromCartDto.user_id,
    );
    const cartProducts = userCart.cart.filter(
      (product) => product.entity_id !== removeProductFromCartDto.entity_id,
    );
    return this.cartModel.findOneAndUpdate(
      userCart,
      { userId: userCart.user_id, cart: cartProducts },
      { new: true },
    );
  }

  async changeProductAmountInCart(
    changeProductAmountDto: ChangeProductAmountDto,
  ): Promise<any> {
    const userCart = await this.getCustomerCart(changeProductAmountDto.user_id);
    let cartProducts = userCart.cart;
    const productForChangeAmount = cartProducts.findIndex(
      (product) => product.entity_id === changeProductAmountDto.entity_id,
    );
    if (changeProductAmountDto.amount < 1) {
      cartProducts = cartProducts.filter(
        (product) => product.entity_id !== changeProductAmountDto.entity_id,
      );
    } else {
      cartProducts[productForChangeAmount].amount =
        changeProductAmountDto.amount;
    }
    return this.cartModel.findOneAndUpdate(
      userCart,
      {
        user_id: userCart.user_id,
        cart: cartProducts,
      },
      { new: true },
    );
  }
  // async getCustomerCartWithRelations(userId: string): Promise<any> {
  //   const userCart = await this.getCustomerCart(userId);
  //   let ticketsArray = userCart.cart;
  //   let productsArray = userCart.cart;
  //   ticketsArray = ticketsArray.filter(
  //     (item) => item.type !== CART_PRODUCT_TYPES.PRODUCT,
  //   );
  //   productsArray = productsArray.filter(
  //     (item) => item.type !== CART_PRODUCT_TYPES.TICKET,
  //   );
  //
  //   const productsArrWithData = [];
  //   const ticketsArrWithData = [];
  //   for (const productItem in productsArray) {
  //     //this.productService.findProductById(productItem.entity_id);
  //   }
  //   for (const ticketItem in ticketsArray) {
  //   }
  // }
}
