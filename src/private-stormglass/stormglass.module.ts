import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnvService } from '@src/private-env/env.service'
import { StormglassService } from '@src/private-stormglass/stormglass.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        baseURL: envService.STORMGLASS_DNS,
      }),
    }),
  ],
  providers: [StormglassService],
  exports: [StormglassService],
})
export class StormglassModule {}
