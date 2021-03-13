import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { InsertProductDto } from './dto/insertProduct.dto';
import { Product } from './interface/product.interface';

@Controller('products')
export class ProductsController {
	constructor(private productService : ProductsService){}

	@Post()
	@HttpCode(204)
	async create(@Body() insertProductDto : InsertProductDto) : Promise<string>{
		this.productService.insert(insertProductDto);
		return 'insert product success!';
	}

	@Get()
	async findAll(): Promise<Product[]>{
		return this.productService.findAll();
	}
}
