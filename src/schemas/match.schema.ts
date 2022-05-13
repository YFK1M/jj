import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Command } from './command.schema';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Command.name })
  first_command_id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Command.name })
  second_command_id: Types.ObjectId;

  @Prop()
  date: string;

  @Prop()
  status: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
