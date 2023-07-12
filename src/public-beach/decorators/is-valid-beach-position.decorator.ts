import { BeachPosition } from '@prisma/client'
import { ValidationOptions, registerDecorator } from 'class-validator'

export function IsValidBeachPosition(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidBeachPosition',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: '$property must be a valid BeachPosition value (S, E, W, N)',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return Object.values(BeachPosition).includes(value)
        },
      },
    })
  }
}
