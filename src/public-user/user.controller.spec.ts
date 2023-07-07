import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import supertest from 'supertest'

const prismaService = new PrismaClient()

describe('Users', () => {
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

  it('should create an user with success', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    }

    const response = await supertest(app.getHttpServer()).post('/users').send(user)

    expect(response.status).toBe(201)
    expect(response.body.data).toEqual(expect.objectContaining(user))
  })
})
