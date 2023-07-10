import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { UniqueConstraintError } from '@src/utils/errors/unique-constraint.error'
import { handleDatabaseErrorsUtil } from '@src/utils/handle-database-errors.util'
import { isPrismaErrorUtil } from '@src/utils/is-prisma-error.util'
import { Observable, catchError } from 'rxjs'

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaErrorUtil(error)) {
          error = handleDatabaseErrorsUtil(error)
        }

        if (error instanceof UniqueConstraintError) {
          throw new ConflictException(error.message)
        }

        throw new BadRequestException(error.message)
      })
    )
  }
}
