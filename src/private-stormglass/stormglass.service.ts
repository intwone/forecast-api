import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EnvService } from '@src/private-env/env.service'
import { ForecastPoint } from '@src/private-stormglass/protocols/forecast-point.protocol'
import {
  StormglassForecastResponse,
  StormglassPoint,
} from '@src/private-stormglass/protocols/stormglass-response.protocol'
import { ClientRequestError } from '@src/utils/errors/client-request.error'
import { ServiceResponseError } from '@src/utils/errors/service-response.error'
import { queryStringGeneratorUtil } from '@src/utils/query-string-generator.util'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class StormglassService {
  public constructor(private readonly httpService: HttpService, private readonly envService: EnvService) {}

  public async getPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const params: { [key: string]: string | number } = {
      lat: lat,
      lng: lng,
      params: 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,waveDirection',
      source: 'noaa',
      end: 1592113802,
    }

    try {
      const result = await firstValueFrom(
        this.httpService.get(`/weather/point?${queryStringGeneratorUtil(params)}`, {
          headers: {
            Authorization: this.envService.STORMGLASS_API_KEY,
          },
        })
      )

      return this.normalize(result.data)
    } catch (error: any) {
      if (error.response && error.response.data) {
        const message = `Error: ${JSON.stringify(error.response.data)} Code: ${error.response.status}`
        throw new ServiceResponseError(message)
      }

      throw new ClientRequestError(error.message, 'Stormglass')
    }
  }

  private normalize(points: StormglassForecastResponse): ForecastPoint[] {
    const normalized = points.hours
      .filter(point => this.isValidPoint(point))
      .map(point => ({
        time: point.time,
        waveDirection: point.waveDirection['noaa'],
        waveHeight: point.waveHeight['noaa'],
        swellDirection: point.swellDirection['noaa'],
        swellHeight: point.swellHeight['noaa'],
        swellPeriod: point.swellPeriod['noaa'],
        windDirection: point.windDirection['noaa'],
        windSpeed: point.windSpeed['noaa'],
      }))

    return normalized
  }

  private isValidPoint(point: Partial<StormglassPoint>): boolean {
    const isValid =
      point.time &&
      point.waveDirection?.['noaa'] &&
      point.waveHeight?.['noaa'] &&
      point.swellDirection?.['noaa'] &&
      point.swellHeight?.['noaa'] &&
      point.swellPeriod?.['noaa'] &&
      point.windDirection?.['noaa'] &&
      point.windSpeed?.['noaa']

    return Boolean(isValid)
  }
}
