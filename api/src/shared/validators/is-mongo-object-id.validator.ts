import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ name: 'isMongoObjectId', async: false })
export class IsMongoObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) return true;
    return isValidObjectId(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid MongoDB ObjectId`;
  }
}

export function IsMongoObjectId(validationOptions?: ValidationOptions) {
  return (target: object, propertyName: string) => {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoObjectIdConstraint
    });
  };
}
