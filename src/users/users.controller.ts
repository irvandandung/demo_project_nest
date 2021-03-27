import { Controller, Get, Post, Put, Delete, Body, HttpCode, Query, HttpStatus, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDto } from './dto/insertUser.dto';
import { User } from './interface/user.interface';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) { }

	@Post()
	async insert(@Body() insertUserDto: InsertUserDto) {
		let idCreate = this.usersService.insert(insertUserDto);
		return { status: 'success', id: idCreate };
	}

	@Post('login')
	async login(@Body() loginUserDto: LoginUserDto) {
		return await this.usersService.loginUser(loginUserDto);
	}

	@Get('find-by-id')
	async findById(@Query('id') id: String) {
		return await this.findById(id);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get('list')
	async list(
		@Query('skip', new ParseIntPipe()) qSkip,
		@Query('limit', new ParseIntPipe()) qLimit,
		@Query('sort', new ParseArrayPipe()) qSort,
		@Query('filter') qFilter,
	) {
		const [users, skip, limit, count, filter] = await this.usersService.list(
			qSkip,
			qLimit,
			qSort,
			qFilter,
		);
		return { users, skip, limit, count, filter }
	}

}
