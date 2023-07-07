import { BeachForecastProtocol } from '@src/public-beach/protocols/beach.protocol'

export interface TimeForecastProtocol {
  time: string
  forecast: BeachForecastProtocol[]
}
