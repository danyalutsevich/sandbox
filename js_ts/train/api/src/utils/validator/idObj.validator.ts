import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsIdOrObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isIdOrObject',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value === 'number') {
            return true;
          }
          if (typeof value === 'object' && value !== null && 'id' in value) {
            return typeof value.id === 'number';
          }
          return false;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Value must be either a number or an object with an id:number';
        },
      },
    });
  };
}
