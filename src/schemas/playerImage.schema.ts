import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { Player } from './player.schema';

export type PlayerImageDocument = PlayerImage & Document;

@Schema()
export class PlayerImage {
  @Prop({ type: SchemaTypes.ObjectId, ref: Player.name })
  player_id: Types.ObjectId;

  @Prop()
  image_url: string;
}

export const PlayerImageSchema = SchemaFactory.createForClass(PlayerImage);
