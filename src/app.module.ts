//import modul
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

//import controller
import { AppController } from './app.controller';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';

//import service
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';

//import middleware
import { AuthMiddleware } from './global/middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	    consumer
	      .apply(AuthMiddleware)
	      .exclude({path: 'users', method: RequestMethod.POST})
	      .forRoutes(ProductsController, UsersController);
  	}
}
