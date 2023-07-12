import { Module } from '@nestjs/common'
import { DatabaseModule } from '@src/private-database/database.module'
import { BeachController } from '@src/public-beach/beach.controller'
import { BeachService } from '@src/public-beach/beach.service'
import { UserModule } from '@src/public-user/user.module'

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [BeachController],
  providers: [BeachService],
})
export class BeachModule {}
