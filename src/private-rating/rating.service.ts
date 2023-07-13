import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EnvService } from '@src/private-env/env.service'

@Injectable()
export class RatingService {
  public constructor(private readonly httpService: HttpService, private readonly envService: EnvService) {}
}
