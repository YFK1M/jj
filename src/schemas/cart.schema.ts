import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';
import { Ticket } from './ticket.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Ticket.name })
  ticket_id: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
