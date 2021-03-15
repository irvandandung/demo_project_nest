import { Module, Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schema/auth.schema';
import { AuthService } from './auth.service';
import { authNameEntity } from './interface/jwt.interface';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt', session: false });
@Injectable()
@Module({
	imports: [
        passportModule,
        MongooseModule.forFeature([{ name: authNameEntity, schema: AuthSchema }]),
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    providers: [AuthService],
    exports: [AuthService ,passportModule],
})
export class AuthModule {}
