import { Injectable } from '@nestjs/common'
import { Beach, Position } from '@prisma/client'
import { PrismaService } from '@src/private-prisma/prisma.service'

@Injectable()
export class BeachRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  // find many

  private async findMany(args: { where?: { user?: { id: string } } }): Promise<Beach[]> {
    return this.prismaService.beach.findMany(args)
  }

  public async findManyByUserId(userId: string): Promise<Beach[]> {
    return this.findMany({
      where: {
        user: { id: userId },
      },
    })
  }

  // create

  public async create(args: {
    data: {
      name: string
      lat: number
      lng: number
      position: Position
      user: { connect: { id: string } }
    }
  }): Promise<Beach> {
    return this.prismaService.beach.create(args)
  }
}
