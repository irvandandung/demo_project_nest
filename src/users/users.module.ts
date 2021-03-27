//module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//controllers
import { UsersController } from './users.controller';

//import service
import { UsersService } from './users.service';

//schema
import { UserSchema } from './schema/user.schema'
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		AuthModule,
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule { }
