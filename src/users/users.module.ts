//module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//controllers
import { UsersController } from './users.controller';

//import service
import { UsersService } from './users.service';

//schema
import { UserSchema } from './schema/user.schema'

@Module({
	imports : [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
	],
	controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
