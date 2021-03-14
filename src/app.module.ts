//import modul
import { ConfigModule } from './config/config.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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

@Module({
  imports: [
  	ConfigModule,
  	MongooseModule.forRoot(
  		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`,
  		{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
  	),
  	ProductsModule, 
  	UsersModule
  ],
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
