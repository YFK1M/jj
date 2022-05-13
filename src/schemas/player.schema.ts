import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  age: number;

  @Prop()
  position: string;

  @Prop()
  match_count: number;

  @Prop()
  goal_count: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
