import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { BeachPosition, PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import supertest from 'supertest'

const prismaService = new PrismaClient()

describe('BeacheController', () => {
  let app: INestApplication
  let accessToken: string

  beforeEach(async () => {
    await prismaService.beach.deleteMany()
    await prismaService.user.deleteMany()

    const user = await prismaService.user.create({
      data: {
        name: 'same-name',
        email: 'same-email@mail.com',
        password: 'same-password',
      },
    })

    await prismaService.beach.create({
      data: {
        name: 'Manly',
        lat: -33.792726,
        lng: 151.289824,
        position: BeachPosition.E,
        user: { connect: { id: user.id } },
      },
    })

    const payload = { sub: user.id }
    const jwtService = new JwtService({ secret: 'supersecret' })
    accessToken = jwtService.sign(payload, { expiresIn: '7d' })

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

    const response = await supertest(app.getHttpServer())
      .post('/beaches')
      .set({ authorization: `Bearer ${accessToken}` })
      .send(beach)

    expect(response.status).toBe(HttpStatus.CREATED)
    expect(response.body.data).toEqual(expect.objectContaining(beach))
  })
})
