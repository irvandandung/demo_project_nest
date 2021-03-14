import { Document } from 'mongoose';

const nameProductEn = 'Product';

interface Product extends Document {
	name : string;
	category: string;
	description: string;
	price: number;
	stock: number;
}

export { nameProductEn, Product }