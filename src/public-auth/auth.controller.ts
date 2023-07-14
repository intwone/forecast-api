import { BadRequestException, Controller, HttpStatus } from '@nestjs/common'
import { Body, Post, Res } from '@nestjs/common/decorators'
import { JwtService } from '@nestjs/jwt'
import { CryptographyService } from '@src/private-cryptography/cryptography.service'
import { CreateAuthDto } from '@src/public-auth/dtos/create-auth.dto'
import { UserService } from '@src/public-user/user.service'
import { Response } from 'express'
import { AuthMessageEnum } from './enums/auth-message.enum'

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly userService: UserService,
    private readonly cryptographyService: CryptographyService,
    protected readonly jwtService: JwtService
  ) {}

  @Post()
  public async create(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const { email, password } = createAuthDto

    const user = await this.userService.findByEmail(email)

    if (!user) throw new BadRequestException(AuthMessageEnum.EMAIL_OR_PASSWORD_INCORRECT)

    const isCorrectPassword = await this.cryptographyService.compare(password, user.password)

    if (!isCorrectPassword) throw new BadRequestException(AuthMessageEnum.EMAIL_OR_PASSWORD_INCORRECT)

    const payload = { sub: user.id }

    const accessToken = await this.cryptographyService.generateToken(payload)

    return res.status(HttpStatus.OK).json({ accessToken: accessToken })
  }
}
