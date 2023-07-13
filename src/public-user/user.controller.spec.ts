import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient, User } from '@prisma/client'
import { AppModule } from '@src/app.module'
import supertest from 'supertest'

const prismaService = new PrismaClient()

describe('UserController', () => {
  let app: INestApplication
  let accessToken: string
  let user: User

  beforeEach(async () => {
    await prismaService.user.deleteMany()

    user = await prismaService.user.create({
      data: {
        name: 'same-name',
        email: 'same-email@mail.com',
        password: 'same-password',
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
    await prismaService.user.deleteMany()
    await app.close()
  })

  it('should create an user with success', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '12345678',
    }

    const response = await supertest(app.getHttpServer()).post('/user').send(user)

    expect(response.status).toBe(HttpStatus.CREATED)
  })

  it('should return user infos', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/user/me')
      .set({ authorization: `Bearer ${accessToken}` })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body.data).toBe(expect.objectContaining(user))
  })
})
