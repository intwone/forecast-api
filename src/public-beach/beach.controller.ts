import { Controller } from '@nestjs/common'
import { Body, Post, Res } from '@nestjs/common/decorators'
import { BeachService } from '@src/public-beach/beach.service'
import { CreateBeachDto } from '@src/public-beach/dtos/create-beach.dto'
import { Response } from 'express'

@Controller('beaches')
export class BeachController {
  public constructor(private readonly beachService: BeachService) {}

  @Post('')
  public async create(@Body() createBeachDto: CreateBeachDto, @Res() res: Response) {
    const beach = await this.beachService.create(createBeachDto)

    return res.status(201).json({ data: beach })
  }
}
