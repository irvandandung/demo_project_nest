import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InsertProductDto } from './dto/insertProduct.dto';
import { Product, nameProductEn } from './interface/product.interface';


@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(nameProductEn) private productModel : Model<Product>
	){}

	async insert(insertProductDto: InsertProductDto) : Promise<string>{
		const insertProduct = new this.productModel(insertProductDto);
		let insert = await insertProduct.save();
		return insert.id;
		
	}

	async findAll() : Promise<Product[]>{
		return await this.productModel.find();
	}

	async findOne(id : string) : Promise<Product>{
		return await this.productModel.findById(id);
	}

	async updateById(id : string, insertProductDto: InsertProductDto) : Promise<string>{
		let response = await this.productModel.findByIdAndUpdate(id, insertProductDto, {new : false, upsert : true}).exec();
		return response.id;
	}

	async deleteById(id: string) : Promise<string>{
		let response = await this.productModel.findByIdAndDelete(id).exec();
		return response.id;
	}

	async list(
		skip?: number,
        limit?: number,
        sort?: string[],
        filter?: string,
	) : Promise<[Product[], number, number, number, string]>{
		let query = {};
        let cursor = this.productModel.find(query).populate('name');
        if (skip) cursor.skip(skip);
        if (limit) cursor.limit(limit);
        if (sort) cursor.sort({ [sort[0]]: sort[1] });
        const users = await cursor.exec();
        const count = await this.productModel.countDocuments(query);

        return [users, skip, limit, count, filter];
	}


}
