import { Test, TestingModule } from '@nestjs/testing'
import { Beach, Position } from '@prisma/client'
import { Rating } from '@src/private-rating/enums/rating.enum'
import { RatingService } from '@src/private-rating/rating.service'

const beach: Beach = {
  id: 'same-id',
  lat: -33.792726,
  lng: 151.289824,
  name: 'Manly',
  position: Position.E,
  userId: 'same-user-id',
}

describe('RatingService', () => {
  let ratingService: RatingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [RatingService],
    }).compile()

    ratingService = module.get<RatingService>(RatingService)
  })

  it('should get rating 1 for a beach with onshore winds', async () => {
    const rating = ratingService.getRatingBasedOnWindAndWavePositions(Position.E, Position.E, beach)

    expect(rating).toBe(Rating.VERY_BAD)
  })

  it('should get rating 3 for a beach with cross winds', async () => {
    const rating = ratingService.getRatingBasedOnWindAndWavePositions(Position.E, Position.S, beach)

    expect(rating).toBe(Rating.NEUTRAL)
  })

  it('should get rating 5 for a beach with offshoew winds', async () => {
    const rating = ratingService.getRatingBasedOnWindAndWavePositions(Position.E, Position.W, beach)

    expect(rating).toBe(Rating.GREAT)
  })

  it('should get rating of 1 for a period of 5 seconds', async () => {
    const rating = ratingService.getRatingForSwellPeriod(5)

    expect(rating).toBe(Rating.VERY_BAD)
  })

  it('should get rating of 1 for a period of 9 seconds', async () => {
    const rating = ratingService.getRatingForSwellPeriod(9)

    expect(rating).toBe(Rating.BAD)
  })

  it('should get rating of 1 for a period of 12 seconds', async () => {
    const rating = ratingService.getRatingForSwellPeriod(12)

    expect(rating).toBe(Rating.GOOD)
  })

  it('should get rating of 1 for a period of 16 seconds', async () => {
    const rating = ratingService.getRatingForSwellPeriod(16)

    expect(rating).toBe(Rating.GREAT)
  })

  it('should get rating 1 for less than ankle to knee bigh swell', async () => {
    const rating = ratingService.getRatingForSwellSize(0.2)

    expect(rating).toBe(Rating.VERY_BAD)
  })

  it('should get rating 2 for an ankle to knee swell', async () => {
    const rating = ratingService.getRatingForSwellSize(0.6)

    expect(rating).toBe(Rating.BAD)
  })

  it('should get rating 3 for waist high swell', async () => {
    const rating = ratingService.getRatingForSwellSize(1.5)

    expect(rating).toBe(Rating.NEUTRAL)
  })

  it('should get rating 5 for overhead swell', async () => {
    const rating = ratingService.getRatingForSwellSize(2.5)

    expect(rating).toBe(Rating.GREAT)
  })

  it('should get the point based on a east location', async () => {
    const response = ratingService.getPositionFromLocation(92)

    expect(response).toBe(Position.E)
  })

  it('should get the point based on a north location', async () => {
    const response = ratingService.getPositionFromLocation(360)

    expect(response).toBe(Position.N)
  })

  it('should get the point based on a north location', async () => {
    const response = ratingService.getPositionFromLocation(40)

    expect(response).toBe(Position.N)
  })

  it('should get the point based on a south location', async () => {
    const response = ratingService.getPositionFromLocation(200)

    expect(response).toBe(Position.S)
  })

  it('should get the point based on a west location', async () => {
    const response = ratingService.getPositionFromLocation(300)

    expect(response).toBe(Position.W)
  })
})
