import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schema/order.schema';
import { nameOrderEntity } from './interface/order.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: nameOrderEntity, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
