import { Injectable } from '@nestjs/common'
import { Beach } from '@prisma/client'
import { BeachRepository } from '@src/private-database/beach.repository'
import { CreateBeachProtocol } from '@src/public-beach/protocols/beach.protocol'

@Injectable()
export class BeachService {
  public constructor(private readonly beachRepository: BeachRepository) {}

  public async create(beach: CreateBeachProtocol): Promise<Beach> {
    const { name, lat, lng, position, userId } = beach

    const newBeach = await this.beachRepository.create({
      data: {
        name: name,
        lat: lat,
        lng: lng,
        position: position,
        user: {
          connect: { id: userId },
        },
      },
    })

    return newBeach
  }
}
