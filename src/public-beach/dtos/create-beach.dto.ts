import { Position } from '@prisma/client'
import { IsValidPosition } from '@src/public-beach/decorators/is-valid-position.decorator'
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export class CreateBeachDto {
  @IsNotEmpty()
  @IsNumber()
  lat!: number

  @IsNotEmpty()
  @IsNumber()
  lng!: number

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string

  @IsNotEmpty()
  @IsValidPosition()
  position!: Position
}
