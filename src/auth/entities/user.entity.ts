import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    required: true,
    maxlength: 50,
    minlength: 2,
  })
  name: string;
  @Prop({
    required: true,
    maxlength: 50,
    minlength: 2,
    unique: true,
    validate: validator.isEmail,
  })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: Role.USER })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
