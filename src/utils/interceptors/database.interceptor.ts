import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
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

        throw new BadRequestException(error.message)
      })
    )
  }
}
