import { Injectable } from '@nestjs/common';
import { Product } from './interface/product.interface';


@Injectable()
export class ProductsService {
	private readonly products : Product[] = [];

	insert(product: Product){
		this.products.push(product);
	}

	findAll() : Product[]{
		return this.products;
	}
}
