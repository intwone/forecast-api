import { Module } from '@nestjs/common'
import { CryptographyModule } from '@src/private-cryptography/cryptography.module'
import { DatabaseProviders } from '@src/private-database/database.provider'
import { PrismaModule } from '@src/private-prisma/prisma.module'

@Module({
  imports: [PrismaModule, CryptographyModule],
  providers: DatabaseProviders,
  exports: DatabaseProviders,
})
export class DatabaseModule {}
