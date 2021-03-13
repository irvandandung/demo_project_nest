import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
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
}
