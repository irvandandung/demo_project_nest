import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common';
import { UserTypes } from './../global/decorator/userTypes.dec';
import { UserTypesGuard } from './../global/guard/userTypes.guard';
import { UsersService } from './users.service';
import { InsertUserDto } from './dto/insertUser.dto';
import { User } from './interface/user.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserType } from 'src/global/enum/userType.enum';

@UseGuards(UserTypesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UserTypes(UserType.ADMIN)
  @Post()
  async insert(@Body() insertUserDto: InsertUserDto) {
    const idCreate = this.usersService.insert(insertUserDto);
    return { status: 'success', id: idCreate };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.loginUser(loginUserDto);
  }

  @UserTypes(UserType.USER)
  @Get('find-by-id')
  async findById(@Query('id') id: string) {
    return await this.findById(id);
  }

  @UserTypes(UserType.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UserTypes(UserType.ADMIN)
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
    return { users, skip, limit, count, filter };
  }
}
