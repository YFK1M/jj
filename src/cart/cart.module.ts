import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../schemas/cart.schema';
import { ProductModule } from '../product/product.module';
import { TicketModule } from "../ticket/ticket.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
    ]),
    ProductModule,
    TicketModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
