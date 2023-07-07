import { Injectable } from '@nestjs/common'
import { Beach } from '@prisma/client'
import { BeachRepository } from '@src/private-database/beach.repository'
import { CreateBeachDto } from '@src/public-beach/dtos/create-beach.dto'

@Injectable()
export class BeachService {
  public constructor(private readonly beachRepository: BeachRepository) {}

  public async create(beachDto: CreateBeachDto): Promise<Beach> {
    const { lat, lng, name, position } = beachDto

    const beach = await this.beachRepository.create({
      data: {
        name: name,
        lat: lat,
        lng: lng,
        position: position,
      },
    })

    return beach
  }
}
