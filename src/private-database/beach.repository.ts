import { Injectable } from '@nestjs/common'
import { Beach, BeachPosition } from '@prisma/client'
import { PrismaService } from '@src/private-prisma/prisma.service'

@Injectable()
export class BeachRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  // find many

  public async findMany(): Promise<Beach[]> {
    return this.prismaService.beach.findMany()
  }

  // create

  public async create(args: {
    data: {
      name: string
      lat: number
      lng: number
      position: BeachPosition
      user: { connect: { id: string } }
    }
  }): Promise<Beach> {
    return this.prismaService.beach.create(args)
  }
}
