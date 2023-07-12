import { Controller, HttpStatus } from '@nestjs/common'
import { Body, Post, Res, UseGuards } from '@nestjs/common/decorators'
import { User } from '@prisma/client'
import { CurrentUser } from '@src/public-auth/decorators/current-user.decorator'
import { AuthGuard } from '@src/public-auth/guards/auth.guard'
import { BeachService } from '@src/public-beach/beach.service'
import { CreateBeachDto } from '@src/public-beach/dtos/create-beach.dto'
import { Response } from 'express'

@Controller('beaches')
export class BeachController {
  public constructor(private readonly beachService: BeachService) {}

  @UseGuards(AuthGuard)
  @Post()
  public async create(@CurrentUser() user: User, @Body() createBeachDto: CreateBeachDto, @Res() res: Response) {
    const beach = await this.beachService.create({ ...createBeachDto, userId: user.id })

    return res.status(HttpStatus.CREATED).json({ data: beach })
  }
}
