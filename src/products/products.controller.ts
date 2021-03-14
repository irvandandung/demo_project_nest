import { Controller, Get, Post, Put, Delete, Body, HttpCode , Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDto } from './dto/insertProduct.dto';
import { Product } from './interface/product.interface';

@Controller('products')
export class ProductsController {
	constructor(private productService : ProductsService){}

	@Post()
	@HttpCode(204)
	async create(@Body() insertProductDto : InsertProductDto){
		return await this.productService.insert(insertProductDto);
	}

	@Get()
	async findAll(): Promise<Product[]>{
		return await this.productService.findAll();
	}

	@Get()
	async findOne(@Query('id') id : string): Promise<Product>{
		return await this.productService.findOne(id);
	}

	@Put()
	async update(@Query('id') id : string, @Body() insertProductDto : InsertProductDto){
		return await this.productService.updateById(id, insertProductDto);
	}

	@Delete()
	async delete(@Query('id') id : string){
		return await this.productService.deleteById(id);
	}
}
