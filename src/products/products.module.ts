//module
import { Module } from '@nestjs/common';

//controllers
import { ProductsController } from './products.controller';

//service 
import { ProductsService } from './products.service';

@Module({
	imports : [],
	controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
