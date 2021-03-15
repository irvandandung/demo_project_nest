import { Document } from 'mongoose';

const nameProductEn = 'Product';

interface Product extends Document {
	readonly name : string;
	readonly category: string;
	readonly description: string;
	readonly price: number;
	readonly stock: number;
}

export { nameProductEn, Product }