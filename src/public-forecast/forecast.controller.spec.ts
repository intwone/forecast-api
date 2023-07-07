import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BeachPosition, PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import { apiForecastResponseBeachFixture } from '@test/fixtures/api-forecast-response-beach-fixture'
import { stormglassWeather3HoursFixture } from '@test/fixtures/stormglass-wheather-3-hours.fixture'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import supertest from 'supertest'

const prismaService = new PrismaClient()
const mockRequest = new MockAdapter(axios)

describe('ForecastService', () => {
  let app: INestApplication

  beforeEach(async () => {
    await prismaService.beach.deleteMany()

    await prismaService.beach.create({
      data: {
        name: 'Manly',
        lat: -33.792726,
        lng: 151.289824,
        position: BeachPosition.E,
      },
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  it('should return a forecast with just a few times', async () => {
    mockRequest.onGet().reply(200, stormglassWeather3HoursFixture)

    const response = await supertest(app.getHttpServer()).get('/forecast')

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual(apiForecastResponseBeachFixture)
  })

  it('should return 500 when samething goes wrong during the processing', async () => {
    mockRequest.onGet().networkError()

    const response = await supertest(app.getHttpServer()).get('/forecast')

    expect(response.status).toBe(500)
  })
})
