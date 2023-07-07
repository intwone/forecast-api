import { PrismaClientErrorType } from '@src/private-prisma/types/prisma-client-error'
import { ConflictError } from '@src/utils/errors/conflict-error'

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientErrorType) {
    const uniqueField = e.meta?.target

    super(`A record with this ${uniqueField} already exists.`)
  }
}
