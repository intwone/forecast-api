import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { EnvService } from '@src/private-env/env.service'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor(private readonly envService: EnvService) {
    super({
      log:
        envService.NODE_ENV === 'production'
          ? undefined
          : [
              { emit: 'stdout', level: 'query' },
              { emit: 'stdout', level: 'info' },
              { emit: 'stdout', level: 'warn' },
              { emit: 'stdout', level: 'error' },
            ],
    })
  }

  public async onModuleInit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e: any) => {
      console.log(`${e.params}`)
    })
  }

  public async enableshutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
