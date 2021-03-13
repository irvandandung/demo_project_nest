import { Controller, Get, Post, Put, Delete, Body, HttpCode , Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto } from './dto/insertUser.dto';
import { User } from './interface/user.interface';

@Controller('users')
export class UsersController {
	constructor(private usersService : UsersService){}

	@Post()
	@HttpCode(204)
	async insert(@Body() insertUserDto : InsertUserDto){
		this.usersService.insert(insertUserDto);
		return 'insert user success!';
	}

	@Get()
	async findAll() : Promise<User[]>{
		return this.usersService.findAll();
	}

	@Get()
	async findOne(@Query('uuid') uuid : string): Promise<User>{
		return this.usersService.findOne(uuid);
	}

	@Put()
	async update(@Query('uuid') uuid : string, @Body() insertUserDto : InsertUserDto){
		this.usersService.update(uuid, insertUserDto);
		return '1';
	}

	@Delete()
	async delete(@Query('uuid') uuid : string){
		this.usersService.delete(uuid);
		return '1';
	}
}
