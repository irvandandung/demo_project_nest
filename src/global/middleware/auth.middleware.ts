import { Injectable, NestMiddleware, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService){}
  async use(req: Request, res: Response, next: NextFunction) {
  	const authHeaders = req.headers.authorization;
  	req['useAuthMiddleware'] = true;
  	if(authHeaders){
  		const str = (authHeaders as string).split(' ');
        if (str[0] !== 'Bearer' || !str[1]) throw new BadRequestException('Invalid token.');
       	const token = str[1];

       	const exists = await this.authService.findByToken(token);
        if (!exists) throw new UnauthorizedException('Not authorized');
        console.log(exists);
        next();
  	}else{
      throw new UnauthorizedException('Not authorized');
    }
    console.log(req.url);
  }
}
