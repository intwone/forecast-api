import { Module } from '@nestjs/common'
import { RatingService } from '@src/private-rating/rating.service'

@Module({
  imports: [],
  providers: [],
  exports: [RatingService],
})
export class RatingModule {}
