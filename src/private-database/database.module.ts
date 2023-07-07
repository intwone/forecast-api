import { Module } from '@nestjs/common'
import { DatabaseProviders } from '@src/private-database/database.provider'
import { PrismaModule } from '@src/private-prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: DatabaseProviders,
  exports: DatabaseProviders,
})
export class DatabaseModule {}
