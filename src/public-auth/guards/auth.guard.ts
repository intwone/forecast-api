import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthMessageEnum } from '@src/public-auth/enums/auth-message.enum'
import { BaseGuard } from '@src/public-auth/guards/base.guard'
import { UserService } from '@src/public-user/user.service'

@Injectable()
export class AuthGuard extends BaseGuard {
  public constructor(protected readonly jwtService: JwtService, private readonly userService: UserService) {
    super(jwtService)
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = super.getRequest(context)
    const accessToken = super.getAccessToken(request)

    if (!accessToken) throw new UnauthorizedException(AuthMessageEnum.AuthorizationNotFound)

    const id = super.getId(accessToken)

    if (!id) throw new UnauthorizedException(AuthMessageEnum.InvalidToken)

    const user = await this.userService.findById(id)

    if (!user) throw new UnauthorizedException(AuthMessageEnum.UserNotFound)

    request.user = user

    return true
  }
}
