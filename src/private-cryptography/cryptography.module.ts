import { Module } from '@nestjs/common'
import { CryptographyService } from '@src/private-cryptography/cryptography.service'
import { EnvModule } from '@src/private-env/env.module'
import { JwtModule } from '@src/private-jwt/jwt.module'

@Module({
  imports: [JwtModule, EnvModule],
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
