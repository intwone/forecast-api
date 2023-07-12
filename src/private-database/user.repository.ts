import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CryptographyService } from '@src/private-cryptography/cryptography.service'
import { PrismaService } from '@src/private-prisma/prisma.service'

@Injectable()
export class UserRepository {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly cryptographyService: CryptographyService
  ) {}

  // find

  private async find(args: { where: { id?: string; email?: string } }): Promise<User | null> {
    return this.prismaService.user.findUnique(args)
  }

  public async findById(id: string): Promise<User | null> {
    return this.find({
      where: {
        id: id,
      },
    })
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
    const hashedPassword = await this.cryptographyService.hash(args.data.password)

    const user = {
      name: args.data.name,
      email: args.data.email,
      password: hashedPassword,
    }

    return this.prismaService.user.create({ data: user })
  }
}
