import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '@src/private-prisma/prisma.service'

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  // find

  private async find(args: { where: { email?: string } }): Promise<User | null> {
    return this.prismaService.user.findUnique(args)
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.find({
      where: {
        email: email,
      },
    })
  }

  // create

  public async create(args: {
    data: {
      name: string
      email: string
      password: string
    }
  }): Promise<User> {
    return this.prismaService.user.create(args)
  }
}
