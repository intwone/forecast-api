import { Controller, HttpStatus } from '@nestjs/common'
import { Get, Res } from '@nestjs/common/decorators'
import { ForecastService } from '@src/public-forecast/forecast.service'
import { Response } from 'express'

@Controller('forecast')
export class ForecastController {
  public constructor(private readonly forecastService: ForecastService) {}

  @Get('')
  public async find(@Res() res: Response) {
    const forecast = await this.forecastService.find()

    return res.status(HttpStatus.OK).json({ data: forecast })
  }
}
