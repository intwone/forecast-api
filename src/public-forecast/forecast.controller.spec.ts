import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Position, PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import { apiForecastResponseBeachFixture } from '@test/fixtures/api-forecast-response-beach-fixture'
import { stormglassWeather3HoursFixture } from '@test/fixtures/stormglass-wheather-3-hours.fixture'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import supertest from 'supertest'

const prismaService = new PrismaClient()
const mockRequest = new MockAdapter(axios)

describe('ForecastController', () => {
  let app: INestApplication
  let accessToken: string

  beforeEach(async () => {
    await prismaService.beach.deleteMany()
    await prismaService.user.deleteMany()

    const user = await prismaService.user.create({
      data: {
        id: '64aeadf2be3c8812c404d30d',
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
        position: Position.E,
        user: { connect: { id: user.id } },
      },
    })

    const payload = { sub: user.id }
    const jwtService = new JwtService({ secret: 'supersecret' })
    accessToken = jwtService.sign(payload, { expiresIn: '7d' })

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.beach.deleteMany()
    await app.close()
  })

  it('should return a forecast with just a few times', async () => {
    mockRequest.onGet().reply(200, stormglassWeather3HoursFixture)

    const response = await supertest(app.getHttpServer())
      .get('/forecast')
      .set({ authorization: `Bearer ${accessToken}` })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body.data).toEqual(apiForecastResponseBeachFixture)
  })

  it('should return 500 when samething goes wrong during the processing', async () => {
    mockRequest.onGet().networkError()

    const response = await supertest(app.getHttpServer())
      .get('/forecast')
      .set({ authorization: `Bearer ${accessToken}` })

    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  })
})
