import { Position } from '@prisma/client'
import { ValidationOptions, registerDecorator } from 'class-validator'

export function IsValidPosition(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPosition',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property must be a valid Position value (S, E, W, N)',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return Object.values(Position).includes(value)
        },
      },
    })
  }
}
