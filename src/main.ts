import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@src/app.module'
import { EnvService } from '@src/private-env/env.service'
import { DatabaseInterceptor } from '@src/utils/interceptors/database.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Interceptors
  app.useGlobalInterceptors(new DatabaseInterceptor())

  const envService = app.get<EnvService>(EnvService)

  await app.listen(envService.PORT)
}

bootstrap()
