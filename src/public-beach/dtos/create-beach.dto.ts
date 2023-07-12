import { BeachPosition } from '@prisma/client'
import { IsValidBeachPosition } from '@src/public-beach/decorators/is-valid-beach-position.decorator'
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
  @IsValidBeachPosition()
  position!: BeachPosition
}
