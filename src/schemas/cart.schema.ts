import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { User } from './user.schema';

export type CartDocument = Cart & Document;

export interface ICart {
  type: string;
  entity_id: string;
  amount: number;
}

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop()
  cart: ICart[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
