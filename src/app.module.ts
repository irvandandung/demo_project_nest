//import modul
import { ConfigModule } from './config/config.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

//import controller
import { AppController } from './app.controller';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';

//import service
import { AppService } from './app.service';

//import middleware
import { AuthMiddleware } from './global/middleware/auth.middleware';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ProductsModule, UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	    consumer
	      .apply(AuthMiddleware)
	      .exclude({path: 'users', method: RequestMethod.POST})
	      .forRoutes(ProductsController, UsersController);
  	}
}
