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
		this.productService.insert(insertProductDto);
		return 'insert product success!';
	}

	@Get()
	async findAll(): Promise<Product[]>{
		return this.productService.findAll();
	}

	@Get()
	async findOne(@Query('id') id : number): Promise<Product>{
		return this.productService.findOne(id);
	}

	@Put()
	async update(@Query('id') id : number, @Body() insertProductDto : InsertProductDto){
		this.productService.update(id, insertProductDto);
		return '1';
	}

	@Delete()
	async delete(@Query('id') id : number){
		this.productService.delete(id);
		return '1';
	}
}
