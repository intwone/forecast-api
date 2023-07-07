import { Controller } from '@nestjs/common'
import { Body, Post, Res } from '@nestjs/common/decorators'
import { CreateUserDto } from '@src/public-user/dtos/create-user.dto'
import { UserService } from '@src/public-user/user.service'
import { Response } from 'express'

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post('')
  public async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto)

    return res.status(201).json({ data: user })
  }
}
