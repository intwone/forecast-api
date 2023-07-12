import { Module } from '@nestjs/common'
import { CryptographyModule } from '@src/private-cryptography/cryptography.module'
import { AuthController } from '@src/public-auth/auth.controller'
import { UserModule } from '@src/public-user/user.module'

@Module({
  imports: [CryptographyModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
