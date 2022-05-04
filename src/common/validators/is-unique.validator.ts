import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
@ValidatorConstraint({ name: 'entityExists', async: true })
@Injectable()
export class EntityExists implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const entity = await this.connection
      .collection(`${validationArguments.constraints[0].name}s`.toLowerCase())
      .findOne({ [validationArguments.property]: text });
    // console.log({ entity });

    return !!!entity;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists`;
  }
}
