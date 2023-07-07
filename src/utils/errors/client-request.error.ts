import { InternalServerErrorException } from '@nestjs/common'

export class ClientRequestError extends InternalServerErrorException {
  public constructor(message?: string, serviceName?: string) {
    super(`Unexpected error when trying to communicate to ${serviceName}: ${message}`)
  }
}
