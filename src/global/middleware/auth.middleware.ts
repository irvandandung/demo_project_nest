import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './../../auth/auth.service';
import { AdminsService } from './../../admins/admins.service';
import { UserType } from './../../global/enum/userType.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly adminsService: AdminsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    req['useAuthMiddleware'] = true;
    if (authHeaders) {
      const str = (authHeaders as string).split(' ');
      if (str[0] !== 'Bearer' || !str[1])
        throw new BadRequestException('Invalid token.');
      const token = str[1];

      //cek expired token
      const verify: any = await this.authService
        .verify(token)
        .catch((reason) => {
          const message =
            reason.name == 'TokenExpiredError'
              ? 'Token expired'
              : reason.message;
          throw new UnauthorizedException(message);
        });

      const exists = await this.authService.findByToken(token);
      if (!exists) throw new UnauthorizedException('Not authorized');

      let userAccount;
      switch (verify.actorModel) {
        case UserType.ADMIN:
          userAccount = await this.adminsService.findById(verify.actor);
          break;

        default:
          break;
      }
      req['userAccount'] = userAccount;
      req['userType'] = verify.actorModel;
      console.log(req);
      next();
    } else {
      throw new UnauthorizedException('Not authorized');
    }
    console.log(req.url);
  }
}
