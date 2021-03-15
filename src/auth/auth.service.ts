import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './../admins/dto/loginAdmin.dto'
import { authNameEntity ,Auth } from './interface/jwt.interface';
import { Model } from 'mongoose';
import * as JWT from 'jwt-decode';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from '../global/enum/userType.enum';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(authNameEntity) private readonly authModel : Model<Auth>,
		private jwtService: JwtService
	){}

    async login(payload: any) {
        const [accessToken, refreshToken] = this.generateToken(payload);
        const saveToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            actor: payload.actor,
            actorModel: UserType.getModel(payload.actorModel),
        };
        return saveToken;
        // const newItem = new this.authModel(saveToken);
        // const result = newItem.save();
        // return result;
    }

    generateToken(payload: any = {}): [string, string] {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_TTL,
        });
        const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.JWT_REFRESH_TTL });
        return [accessToken, refreshToken];
    }
}
