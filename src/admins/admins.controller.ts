import {
  Controller,
  Post,
  InternalServerErrorException,
  Body,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { InsertAdminDto } from './dto/insertAdmin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async insert(@Body() insertAdminDto: InsertAdminDto) {
    const idCreate = await this.adminsService.insertAdmin(insertAdminDto);
    if (idCreate === '' || idCreate === null || idCreate === undefined)
      throw new InternalServerErrorException('error, data not inserted!');
    return { status: 'success', id: idCreate };
  }

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminsService.loginAdmin(loginAdminDto);
  }
}
