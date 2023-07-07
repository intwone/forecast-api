import { InternalServerErrorException } from '@nestjs/common'

export class ServiceResponseError extends InternalServerErrorException {
  public constructor(message?: string, serviceName?: string) {
    super(`Unexpected error returned by the ${serviceName} service: ${message}`)
  }
}
