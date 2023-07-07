import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  public constructor(private readonly configService: ConfigService) {}

  public get NODE_ENV() {
    return this.configService.get('NODE_ENV') as 'local' | 'development' | 'production'
  }

  public get PORT() {
    return this.configService.get('PORT') as number
  }

  public get STORMGLASS_DNS() {
    return this.configService.get('STORMGLASS_DNS') as string
  }

  public get MONGO_URL() {
    return this.configService.get('MONGO_URL') as string
  }

  public get STORMGLASS_API_KEY() {
    return this.configService.get('STORMGLASS_API_KEY') as string
  }
}
