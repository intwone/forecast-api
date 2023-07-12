import { Controller, HttpStatus } from '@nestjs/common'
import { Get, Res, UseGuards } from '@nestjs/common/decorators'
import { User } from '@prisma/client'
import { CurrentUser } from '@src/public-auth/decorators/current-user.decorator'
import { AuthGuard } from '@src/public-auth/guards/auth.guard'
import { ForecastService } from '@src/public-forecast/forecast.service'
import { Response } from 'express'

@Controller('forecast')
export class ForecastController {
  public constructor(private readonly forecastService: ForecastService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async find(@CurrentUser() user: User, @Res() res: Response) {
    const forecast = await this.forecastService.find(user.id)

    return res.status(HttpStatus.OK).json({ data: forecast })
  }
}
