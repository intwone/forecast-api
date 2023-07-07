import { Module } from '@nestjs/common'
import { EnvModule } from '@src/private-env/env.module'
import { BeachModule } from '@src/public-beach/beach.module'
import { ForecastModule } from '@src/public-forecast/forecast.module'
import { UserModule } from '@src/public-user/user.module'

@Module({
  imports: [EnvModule, ForecastModule, BeachModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
