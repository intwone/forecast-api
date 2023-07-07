import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserRepository } from '@src/private-database/user.repository'
import { CreateUserDto } from '@src/public-user/dtos/create-user.dto'

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const { name, email, password } = userDto

    const newUser = await this.userRepository.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    })

    return newUser
  }
}
