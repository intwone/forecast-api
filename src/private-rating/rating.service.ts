import { Injectable } from '@nestjs/common'
import { Beach, Position } from '@prisma/client'
import { Rating } from '@src/private-rating/enums/rating.enum'
import { coordinatesMap } from '@src/private-rating/mappers/coordinates.map'
import { waveHeightsMap } from '@src/private-rating/mappers/wave-height.map'

@Injectable()
export class RatingService {
  public getRatingBasedOnWindAndWavePositions(wavePosition: Position, windPosition: Position, beach: Beach): number {
    if (wavePosition === windPosition) return Rating.VERY_BAD
    if (this.isWindOffShore(wavePosition, windPosition, beach)) return Rating.GREAT

    return Rating.NEUTRAL
  }

  public getRatingForSwellPeriod(period: number): number {
    if (period >= 7 && period < 10) return Rating.BAD
    if (period >= 10 && period < 14) return Rating.GOOD
    if (period >= 14) return Rating.GREAT

    return Rating.VERY_BAD
  }

  public getRatingForSwellSize(height: number): number {
    if (height >= waveHeightsMap.ankleToKnee.min && height < waveHeightsMap.ankleToKnee.max) return Rating.BAD
    if (height >= waveHeightsMap.waistHigh.min && height < waveHeightsMap.waistHigh.max) return Rating.NEUTRAL
    if (height >= waveHeightsMap.headHigh.min) return Rating.GREAT

    return Rating.VERY_BAD
  }

  public getPositionFromLocation(coordinates: number): Position {
    // prettier-ignore
    if (coordinates >= coordinatesMap.north.max ||  (coordinates < coordinatesMap.north.min && coordinates >= 0)) return Position.N
    if (coordinates >= coordinatesMap.east.min && coordinates < coordinatesMap.east.max) return Position.E
    if (coordinates >= coordinatesMap.south.min && coordinates < coordinatesMap.south.max) return Position.S
    if (coordinates >= coordinatesMap.west.min && coordinates < coordinatesMap.west.max) return Position.W

    return Position.E
  }

  private isWindOffShore(wavePosition: Position, windPosition: Position, beach: Beach): boolean {
    return (
      (wavePosition === Position.N && windPosition === Position.S && beach.position === Position.N) ||
      (wavePosition === Position.S && windPosition === Position.N && beach.position === Position.S) ||
      (wavePosition === Position.E && windPosition === Position.W && beach.position === Position.E) ||
      (wavePosition === Position.W && windPosition === Position.E && beach.position === Position.W)
    )
  }
}
