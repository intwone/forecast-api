import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { AppModule } from '@src/app.module'
import bcrypt from 'bcrypt'
import supertest from 'supertest'

const prismaService = new PrismaClient()

describe('AuthController', () => {
  let app: INestApplication

  beforeEach(async () => {
    await prismaService.user.deleteMany()

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.user.deleteMany()
    await app.close()
  })

  it('should authenticate an user', async () => {
    const password = '12345678'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: hashedPassword,
    }

    await prismaService.user.create({ data: user })

    const response = await supertest(app.getHttpServer()).post('/auth').send({
      email: user.email,
      password: password,
    })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toEqual(expect.objectContaining({ accessToken: expect.any(String) }))
  })

  it('should not authenticate an user when user not exists', async () => {
    const response = await supertest(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@mail.com',
      password: '12345678',
    })

    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('should not authenticate an user when password is incorrect', async () => {
    const password = '12345678'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: hashedPassword,
    }

    await prismaService.user.create({ data: user })

    const response = await supertest(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@mail.com',
      password: 'incorrect-password',
    })

    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
  })
})
