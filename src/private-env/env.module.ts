import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from '@src/private-env/env.service'

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
