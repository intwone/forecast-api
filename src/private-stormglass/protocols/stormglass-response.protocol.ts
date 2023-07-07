interface StormglassPointSource {
  [key: string]: number
}

export interface StormglassPoint {
  time: string
  waveDirection: StormglassPointSource
  waveHeight: StormglassPointSource
  swellDirection: StormglassPointSource
  swellHeight: StormglassPointSource
  swellPeriod: StormglassPointSource
  windDirection: StormglassPointSource
  windSpeed: StormglassPointSource
}

export interface StormglassForecastResponse {
  hours: StormglassPoint[]
}
