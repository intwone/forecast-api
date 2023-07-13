import { Controller, HttpStatus } from '@nestjs/common'
import { Body, Get, Post, Res, UseGuards } from '@nestjs/common/decorators'
import { User } from '@prisma/client'
import { CurrentUser } from '@src/public-auth/decorators/current-user.decorator'
import { AuthGuard } from '@src/public-auth/guards/auth.guard'
import { CreateUserDto } from '@src/public-user/dtos/create-user.dto'
import { UserService } from '@src/public-user/user.service'
import { Response } from 'express'

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto)
    const { password, ...userWithoutPassword } = user

    return res.status(HttpStatus.CREATED).json({ data: userWithoutPassword })
  }

  @UseGuards(AuthGuard)
  @Get('me')
  public async me(@CurrentUser() user: User, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ data: user })
  }
}
