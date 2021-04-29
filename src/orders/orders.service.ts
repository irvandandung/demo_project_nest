import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { nameOrderEntity, Order } from './interface/order.interface';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(nameOrderEntity) private orderModel: Model<Order>) {}

  async insert(orderDto: OrderDto) {
    const order = new this.orderModel(orderDto);
    const insert = await order.save();
    return insert.id;
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id);
  }
}
