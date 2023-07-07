import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export type PrismaClientErrorType = PrismaClientKnownRequestError & {
  meta?: { target: string }
}
