import { Module } from '@nestjs/common'
import { PrismaService } from '@src/private-prisma/prisma.service'

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
