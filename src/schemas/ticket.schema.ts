import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { Match } from './match.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Match.name })
  match_id: string;

  @Prop()
  price: string;
}

export const TicketDocument = SchemaFactory.createForClass(Ticket);
