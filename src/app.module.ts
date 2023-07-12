import { Module } from '@nestjs/common'
import { EnvModule } from '@src/private-env/env.module'
import { JwtModule } from '@src/private-jwt/jwt.module'
import { AuthModule } from '@src/public-auth/auth.module'
import { BeachModule } from '@src/public-beach/beach.module'
import { ForecastModule } from '@src/public-forecast/forecast.module'
import { UserModule } from '@src/public-user/user.module'

@Module({
  imports: [EnvModule, JwtModule, ForecastModule, BeachModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
