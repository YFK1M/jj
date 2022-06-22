import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommandDocument = Command & Document;

@Schema()
export class Command {
  @Prop()
  image: string;

  @Prop()
  title: string;
}

export const CommandSchema = SchemaFactory.createForClass(Command);
