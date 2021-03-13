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

	findOne(id: number): Product{
		return this.products.find(product => product.id === id);
	}

	update(id: number, product : Product){
		let indexProduct = this.products.findIndex(product => product.id === id);
		this.products[indexProduct] = product;
	}

	delete(id: number){
		let indexProduct = this.products.findIndex(product => product.id === id);
		this.products.splice(indexProduct, 1);
	}

}
