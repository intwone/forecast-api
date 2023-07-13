import { Test, TestingModule } from '@nestjs/testing'
import { BeachPosition } from '@prisma/client'
import { RatingService } from '@src/private-rating/rating.service'

const beach = {
  lat: -33.792726,
  lng: 151.289824,
  name: 'Manly',
  position: BeachPosition.E,
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
    const rating = ratingService.getRatingBasedOnWindAndWavePositions(BeachPosition.E, BeachPosition)
  })
})
