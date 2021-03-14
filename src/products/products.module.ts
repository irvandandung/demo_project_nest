//module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

//controllers
import { ProductsController } from './products.controller';

//service 
import { ProductsService } from './products.service';

//schema 
import { ProductSchema } from './schema/product.schema';

import { nameProductEn } from './interface/product.interface';

@Module({
	imports : [
		MongooseModule.forFeature([{name: nameProductEn, schema: ProductSchema}])
	],
	controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
