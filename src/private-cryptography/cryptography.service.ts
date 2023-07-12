import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EnvService } from '@src/private-env/env.service'
import bcrypt from 'bcrypt'

@Injectable()
export class CryptographyService {
  public constructor(protected readonly jwtService: JwtService, private readonly envService: EnvService) {}

  public async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10)
    return hash
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  public async generateToken(payload: any): Promise<string> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: this.envService.JWT_EXPIRES_IN })
    return accessToken
  }
}
