import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Todo extends Document {
  @Prop({ required: true, maxlength: 50, minlength: 2 })
  title: string;

  @Prop({ required: true, default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
