import { Module } from '@nestjs/common';

//controllers
import { UsersController } from './users.controller';

//import service
import { UsersService } from './users.service';

@Module({
	imports : [],
	controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
