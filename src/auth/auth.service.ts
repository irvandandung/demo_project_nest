import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authNameEntity, Auth } from './interface/jwt.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from '../global/enum/userType.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(authNameEntity) private readonly authModel: Model<Auth>,
        private jwtService: JwtService
    ) { }

    async login(payload: any) {
        const [accessToken, refreshToken] = this.generateToken(payload);
        const saveToken = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            actor: payload.actor,
            actorModel: UserType.getModel(payload.actorModel),
        };
        const newItem = new this.authModel(saveToken);
        const result = newItem.save();
        return result;
    }

    //verify token
    async verify(accessToken: string) {
        return this.jwtService.verify(accessToken);
    }

    //find by token
    async findByToken(accessToken: string): Promise<Auth> {
        return this.authModel.findOne({ accessToken: accessToken }).exec();
    }

    generateToken(payload: any = {}): [string, string] {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_TTL,
        });
        const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.JWT_REFRESH_TTL });
        return [accessToken, refreshToken];
    }
}
