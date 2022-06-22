import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { CreateCartDto } from './dto/createCart.dto';
import { AddProductToCustomerCartDto } from './dto/addProductToCustomerCart.dto';
import { AddTicketToCustomerCartDto } from "./dto/addTicketToCustomerCart.dto";
import { ChangeProductAmountDto } from './dto/changeProductAmount.dto';
import { RemoveProductFromCartDto } from './dto/removeProductFromCart.dto';
import { CART_PRODUCT_TYPES } from '../constants/cart/cartConstants';
import { ProductService } from '../product/product.service';
import { TicketService } from "../ticket/ticket.service";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productService: ProductService,
    private ticketService: TicketService,
  ) {}

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

    if (!userCart) return null;

    const cartProducts = userCart.cart;
    cartProducts.push(addProductToCustomerCartDto.cartProduct);
    return this.cartModel.findOneAndUpdate(
      userCart,
      { userId: userCart.user_id, cart: cartProducts },
      { new: true },
    );
  }

  async addTicketToCart(
      addTicketToCustomerCartDto: AddTicketToCustomerCartDto,
  ): Promise<any> {
    const userCart = await this.getCustomerCart(
        addTicketToCustomerCartDto.user_id,
    );

    if (!userCart) return null;

    const cartTickets = userCart.cart;
    cartTickets.push(addTicketToCustomerCartDto.cartTicket);
    return this.cartModel.findOneAndUpdate(
        userCart,
        { userId: userCart.user_id, cart: cartTickets },
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
  async getCustomerCartWithRelations(userId: string): Promise<any> {
    const userCart = await this.getCustomerCart(userId);
    if (!userCart) return null;
    let ticketsArray = userCart.cart;
    let productsArray = userCart.cart;
    ticketsArray = ticketsArray.filter(
      (item) => item.type !== CART_PRODUCT_TYPES.PRODUCT,
    );
    productsArray = productsArray.filter(
      (item) => item.type !== CART_PRODUCT_TYPES.TICKET,
    );

    const productsArrWithData = [];

    for (const productItem in productsArray) {
      const product = await this.productService.findProductById(
        productsArray[productItem].entity_id,
      );
      productsArrWithData.push({
        ...product,
        amount: productsArray[productItem].amount,
        type: 'PRODUCT',
      });
    }
    for (const ticketItem in ticketsArray) {
      const ticket = await this.ticketService.getById(
          ticketsArray[ticketItem].entity_id,
      );
      productsArrWithData.push({
        ...ticket,
        amount: ticketsArray[ticketItem].amount,
        type: 'TICKET',
      });
    }
    let preparedData = userCart;
    preparedData.cart = productsArrWithData;
    console.log(preparedData.cart)
    console.log(preparedData)
    return preparedData;
  }
}
