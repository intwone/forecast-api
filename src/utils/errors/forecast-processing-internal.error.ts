import { InternalServerErrorException } from '@nestjs/common'

export class ForecastProcessingInternalError extends InternalServerErrorException {
  public constructor(message?: string, serviceName?: string) {
    super(`Unexpected error during the forecast processing: ${message}`)
  }
}
