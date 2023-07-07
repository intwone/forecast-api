import { Module } from '@nestjs/common'
import { DatabaseModule } from '@src/private-database/database.module'
import { StormglassModule } from '@src/private-stormglass/stormglass.module'
import { ForecastController } from '@src/public-forecast/forecast.controller'
import { ForecastService } from '@src/public-forecast/forecast.service'

@Module({
  imports: [StormglassModule, DatabaseModule],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
