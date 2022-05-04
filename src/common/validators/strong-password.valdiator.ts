import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import validator from 'validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return validator.isStrongPassword(value, { minSymbols: 0 });
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} is not strong`;
        },
      },
    });
  };
}
