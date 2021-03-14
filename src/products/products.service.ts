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

	async insert(insertProductDto: InsertProductDto) : Promise<Product>{
		let insertProduct = new this.productModel(insertProductDto);
		return await insertProduct.save();
		
	}

	async findAll() : Promise<Product[]>{
		return await this.productModel.find();
	}

	async findOne(id : string) : Promise<Product>{
		return await this.productModel.findById(id);
	}

	async updateById(id : string, insertProductDto: InsertProductDto) : Promise<any>{
		let response : any
		this.productModel.findByIdAndUpdate(id, insertProductDto, {new : false}, (err, productUpdate, res)=>{
			if (err) {
				console.log(err);
				response = err;
			}else{
				console.log(res)
				response =  res;
			}
		});
		return await response;
	}

	async deleteById(id: string) : Promise<any>{
		let response : any
		this.productModel.findByIdAndDelete(id, {} , (err, product ,res) =>{
			if(!err) response = res;
			console.log(err);
		})
		return await response;
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
