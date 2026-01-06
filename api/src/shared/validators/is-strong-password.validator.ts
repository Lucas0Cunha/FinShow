import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, _args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }

    if (value.trim().length === 0) {
      return false;
    }

    const size = value.length;
    if (size < 8 || size > 100) {
      return false;
    }

    const regex =
      /^(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])(?=.*[A-Z])(?=.*[a-z]).+$/;
    return regex.test(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Password must be a non-empty string with 8 and 100 chars, containing at least one number, one special character, one uppercase and one lowercase letter';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint
    });
  };
}
