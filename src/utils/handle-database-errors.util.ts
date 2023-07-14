import { PrismaErrorsEnum } from '@src/private-prisma/enums/prisma-error.enum'
import { PrismaClientErrorType } from '@src/private-prisma/types/prisma-client-error'
import { DatabaseError } from '@src/utils/errors/database.error'
import { UniqueConstraintError } from '@src/utils/errors/unique-constraint.error'

export const handleDatabaseErrorsUtil = (e: PrismaClientErrorType): Error => {
  switch (e.code) {
    case PrismaErrorsEnum.UNIQUE_CONSTRAINT_FAIL:
      return new UniqueConstraintError(e)

    default:
      return new DatabaseError(e.message)
  }
}
