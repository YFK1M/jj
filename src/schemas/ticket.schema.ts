import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document } from 'mongoose';
import { Match } from './match.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ type: SchemaTypes.ObjectId, ref: Match.name })
  match_id: string;

  @Prop()
  price: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
