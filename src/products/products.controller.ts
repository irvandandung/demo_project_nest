import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  Query,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDto } from './dto/insertProduct.dto';
import { Product } from './interface/product.interface';
import { UserTypesGuard } from 'src/global/guard/userTypes.guard';
import { UserTypes } from 'src/global/decorator/userTypes.dec';
import { UserType } from 'src/global/enum/userType.enum';

@UseGuards(UserTypesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UserTypes(UserType.ADMIN)
  @Post()
  async create(@Body() insertProductDto: InsertProductDto) {
    const idCreate = await this.productService.insert(insertProductDto);
    if (idCreate === '' || idCreate === null || idCreate === undefined)
      throw new InternalServerErrorException('error, data not inserted!');
    return { status: 'success', id: idCreate };
  }

  @UserTypes(UserType.ADMIN)
  @Get()
  async findAll(): Promise<Product[]> {
    const response = await this.productService.findAll();
    return response;
  }

  @UserTypes(UserType.ADMIN)
  @Get('byId')
  async findOne(@Query('id') id: string): Promise<Product> {
    const response = await this.productService.findOne(id);
    return response;
  }

  @UserTypes(UserType.ADMIN)
  @Put()
  async update(
    @Query('id') id: string,
    @Body() insertProductDto: InsertProductDto,
  ) {
    const idUp = await this.productService.updateById(id, insertProductDto);
    if (idUp === '' || idUp === null || idUp === undefined)
      throw new InternalServerErrorException('error, data not Updated!');
    HttpCode(202);
    return { status: 'success', id: idUp };
  }

  @UserTypes(UserType.ADMIN)
  @Delete()
  async delete(@Query('id') id: string) {
    const idDel = await this.productService.deleteById(id);
    if (idDel === '' || idDel === null || idDel === undefined)
      throw new InternalServerErrorException('error, data not Updated!');
    return { status: 'success', id: idDel };
  }

  @UserTypes(UserType.ADMIN)
  @Get('amountpercategory')
  async getGroupAmountById() {
    return await this.productService.getGroupAmountByCategory();
  }
}
