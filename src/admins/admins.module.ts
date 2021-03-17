//module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './../auth/auth.module';
//controller
import { AdminsController } from './admins.controller'
//service
import { AdminsService } from './admins.service'
//schema
import { AdminSchema } from './schema/admin.schema'
import { nameAdminEntity } from './interface/admin.interface'

@Module({
	imports : [
		MongooseModule.forFeature([{name : nameAdminEntity, schema : AdminSchema}]),
		AuthModule,
	],
	controllers : [AdminsController],
	providers : [AdminsService],
	exports : [AdminsService]
})
export class AdminsModule {}
