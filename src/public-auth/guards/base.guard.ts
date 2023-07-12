import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class BaseGuard implements CanActivate {
  public constructor(protected readonly jwtService: JwtService) {}

  protected getRequest(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest()
    return request
  }

  private parseAccessTokenFromHeader(request: any): string | undefined {
    try {
      const header = request.headers.authorization as string | undefined

      if (header) {
        const accessToken = header.split(' ')[1]
        return accessToken
      }

      return undefined
    } catch (error) {
      return undefined
    }
  }

  private parseId(accessToken: string): string | undefined {
    try {
      this.jwtService.verify(accessToken)
      const payload = this.jwtService.decode(accessToken) as { sub: string }
      const id = payload.sub
      return id
    } catch (error) {
      return undefined
    }
  }

  protected getAccessToken(request: any): string | undefined {
    const accessToken = this.parseAccessTokenFromHeader(request)
    return accessToken
  }

  protected getId(accessToken: string): string | undefined {
    const id = this.parseId(accessToken)
    return id
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return !!context
  }
}
