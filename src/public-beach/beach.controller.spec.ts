import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BeachPosition, PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import supertest from 'supertest'

const prismaService = new PrismaClient()

describe('Beaches', () => {
  let app: INestApplication

  beforeEach(async () => {
    await prismaService.beach.deleteMany()

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.beach.deleteMany()
    await app.close()
  })

  it('should create a beach with success', async () => {
    const beach = {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
    }

    const response = await supertest(app.getHttpServer()).post('/beaches').send(beach)

    expect(response.status).toBe(HttpStatus.CREATED)
    expect(response.body.data).toEqual(expect.objectContaining(beach))
  })
})
