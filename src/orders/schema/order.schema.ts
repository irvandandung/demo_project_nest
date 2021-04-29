import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
class ProductOrder {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
}

@Schema()
class UserOrder {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: string;
}

@Schema()
class Status {
  @Prop({ required: true })
  isPaid: boolean;
  @Prop({ required: true })
  desc: string;
}

@Schema()
class OrderEntity {
  @Prop({ required: true })
  totalItem: number;
  @Prop({ required: true })
  totalPrice: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserOrder' })
  dataUser: UserOrder;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatusOrder' })
  status: Status;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductOrder' }],
  })
  item: ProductOrder[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
