import { Controller } from '@nestjs/common'
import { Get, Res } from '@nestjs/common/decorators'
import { BeachRepository } from '@src/private-database/beach.repository'
import { ForecastService } from '@src/public-forecast/forecast.service'
import { Response } from 'express'

@Controller('forecast')
export class ForecastController {
  public constructor(
    private readonly beachRepository: BeachRepository,
    private readonly forecastService: ForecastService
  ) {}

  @Get('')
  public async getAll(@Res() res: Response): Promise<void> {
    // TODO: remove this logic in the future
    const beaches = await this.beachRepository.findMany()

    const forecastData = await this.forecastService.process(beaches)

    res.status(200).json({ data: forecastData })
  }
}
