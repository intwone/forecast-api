import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { EnvModule } from '@src/private-env/env.module'
import { EnvService } from '@src/private-env/env.service'
import { StormglassService } from '@src/private-stormglass/stormglass.service'
import { ClientRequestError } from '@src/utils/errors/client-request.error'
import { ServiceResponseError } from '@src/utils/errors/service-response.error'
import { stormglassWeather3HoursNormalizedFixture } from '@test/fixtures/stormglass-wheather-3-hours-normalized.fixture'
import { stormglassWeather3HoursFixture } from '@test/fixtures/stormglass-wheather-3-hours.fixture'
import { AxiosResponse } from 'axios'
import { of, throwError } from 'rxjs'

describe('StormglassService', () => {
  let stormglassService: StormglassService
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          inject: [EnvService],
          useFactory: async (envService: EnvService) => ({
            baseURL: envService.STORMGLASS_DNS,
          }),
        }),
        EnvModule,
      ],
      providers: [StormglassService],
    }).compile()

    stormglassService = module.get<StormglassService>(StormglassService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should return normalized forecast from stormglass service', async () => {
    const lat = -33.2232
    const lng = 151.12211

    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of({ data: stormglassWeather3HoursFixture } as AxiosResponse))

    const result = await stormglassService.getPoints(lat, lng)

    expect(result).toEqual(stormglassWeather3HoursNormalizedFixture)
  })

  it('should exclude incomplete data points', async () => {
    const lat = -33.2232
    const lng = 151.12211

    const incompleteResponse = {
      hours: [{ windDirection: { noaa: 300 }, time: '2020-04-26T02:00:00+00:00' }],
    }

    jest.spyOn(httpService, 'get').mockImplementation(() => of({ data: incompleteResponse } as AxiosResponse))

    const result = await stormglassService.getPoints(lat, lng)

    expect(result).toEqual([])
  })

  it('should return a ClientRequestException error when the request fail before reaching the service', async () => {
    const lat = -33.2232
    const lng = 151.12211

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new ClientRequestError('Network Error', 'Stormglass')))

    const promise = stormglassService.getPoints(lat, lng)

    await expect(promise).rejects.toThrow('Unexpected error when trying to communicate to Stormglass: Network Error')
  })

  it('should get ServiceResponseException when Stormglass service responds with error', async () => {
    const lat = -33.2232
    const lng = 151.12211

    const message = 'Error: {"error": ["Rate Limit reached"]} Code: 429'

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new ServiceResponseError(message, 'Stormglass')))

    const promise = stormglassService.getPoints(lat, lng)

    await expect(promise).rejects.toThrow(
      'Unexpected error returned by the Stormglass service: Error: {"error": ["Rate Limit reached"]} Code: 429'
    )
  })
})
