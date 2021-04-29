import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { Order } from './interface/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto) {
    const idCreate = await this.ordersService.insert(orderDto);
    if (idCreate === '' || idCreate === null || idCreate === undefined)
      throw new InternalServerErrorException('error, data not inserted!');
    const order: Order = await this.ordersService.findOne(idCreate);
    return order;
  }
}
