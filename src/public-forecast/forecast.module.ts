import { Module } from '@nestjs/common'
import { DatabaseModule } from '@src/private-database/database.module'
import { StormglassModule } from '@src/private-stormglass/stormglass.module'
import { ForecastController } from '@src/public-forecast/forecast.controller'
import { ForecastService } from '@src/public-forecast/forecast.service'
import { UserModule } from '@src/public-user/user.module'

@Module({
  imports: [StormglassModule, DatabaseModule, UserModule],
  controllers: [ForecastController],
  providers: [ForecastService],
  exports: [ForecastService],
})
export class ForecastModule {}
