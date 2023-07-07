import { PrismaClientErrorType } from '@src/private-prisma/types/prisma-client-error'

export const isPrismaErrorUtil = (e: PrismaClientErrorType): boolean => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || (typeof e.meta === 'object' && typeof e.meta.target === 'string'))
  )
}
