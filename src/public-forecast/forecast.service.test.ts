import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { Beach, BeachPosition } from '@prisma/client'
import { DatabaseModule } from '@src/private-database/database.module'
import { EnvModule } from '@src/private-env/env.module'
import { EnvService } from '@src/private-env/env.service'
import { StormglassService } from '@src/private-stormglass/stormglass.service'
import { ForecastService } from '@src/public-forecast/forecast.service'
import { ForecastProcessingInternalError } from '@src/utils/errors/forecast-processing-internal.error'
import { stormglassWeather3HoursNormalizedFixture } from '@test/fixtures/stormglass-wheather-3-hours-normalized.fixture'

describe('ForecastService', () => {
  let forecastService: ForecastService
  let stormglassService: StormglassService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          inject: [EnvService],
          useFactory: async (envService: EnvService) => ({
            baseURL: envService.STORMGLASS_DNS,
          }),
        }),
        DatabaseModule,
        EnvModule,
      ],
      providers: [ForecastService, StormglassService],
    }).compile()

    stormglassService = module.get<StormglassService>(StormglassService)
    forecastService = module.get<ForecastService>(ForecastService)
  })

  it('should return an empty list when the beaches array is empty', async () => {
    stormglassService.getPoints = jest.fn().mockResolvedValue(stormglassWeather3HoursNormalizedFixture)

    const result = await forecastService.process([])

    expect(result).toEqual([])
  })

  it('should throw an error when something goes wrong during the rating process', async () => {
    stormglassService.getPoints = jest.fn().mockRejectedValue('Error')

    const beaches: Beach[] = [
      {
        id: 'same-id',
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        userId: 'same-user-id',
      },
    ]

    const promise = forecastService.process(beaches)

    await expect(promise).rejects.toThrow(ForecastProcessingInternalError)
  })
})
