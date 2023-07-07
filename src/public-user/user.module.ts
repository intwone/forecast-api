import { Module } from '@nestjs/common'
import { DatabaseModule } from '@src/private-database/database.module'
import { UserController } from '@src/public-user/user.controller'
import { UserService } from '@src/public-user/user.service'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
