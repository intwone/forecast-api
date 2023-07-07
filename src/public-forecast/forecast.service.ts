import { Injectable } from '@nestjs/common'
import { Beach } from '@prisma/client'
import { ForecastPoint } from '@src/private-stormglass/protocols/forecast-point.protocol'
import { StormglassService } from '@src/private-stormglass/stormglass.service'
import { BeachForecastProtocol } from '@src/public-beach/protocols/beach.protocol'
import { TimeForecastProtocol } from '@src/public-forecast/protocols/time-forecast.protocol'
import { ForecastProcessingInternalError } from '@src/utils/errors/forecast-processing-internal.error'

@Injectable()
export class ForecastService {
  public constructor(private readonly stormglassService: StormglassService) {}

  public async process(beaches: Beach[]): Promise<TimeForecastProtocol[]> {
    const beachForecast: BeachForecastProtocol[] = []

    try {
      for (const beach of beaches) {
        const points = await this.stormglassService.getPoints(beach.lat, beach.lng)

        const beachData = this.enrichedBeachData(points, beach)

        beachForecast.push(...beachData)
      }
    } catch (error: any) {
      throw new ForecastProcessingInternalError(error.message, 'Stormglass')
    }

    return this.mapForecastByTime(beachForecast)
  }

  private enrichedBeachData(points: ForecastPoint[], beach: Beach): BeachForecastProtocol[] {
    const beachData = points.map(point => ({
      ...point,
      lat: beach.lat,
      lng: beach.lng,
      name: beach.name,
      position: beach.position,
      rating: 1,
    }))

    return beachData
  }

  private mapForecastByTime(forecast: BeachForecastProtocol[]): TimeForecastProtocol[] {
    const forecastByTime: TimeForecastProtocol[] = []

    for (const point of forecast) {
      const timePoint = forecastByTime.find(f => f.time === point.time)

      if (timePoint) {
        timePoint.forecast.push(point)
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        })
      }
    }

    return forecastByTime
  }
}
