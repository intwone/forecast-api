import { Beach } from '@prisma/client'
import { ForecastPoint } from '@src/private-stormglass/protocols/forecast-point.protocol'

export interface BeachForecastProtocol extends Omit<Beach, 'user' | 'id'>, ForecastPoint {}
