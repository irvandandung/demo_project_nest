import { IsNotEmpty, IsBoolean } from 'class-validator';
import { UserOrderDto } from './userOrder.dto';
import { ProductOrderDto } from './productOrder.dto';

export class OrderDto {
  readonly totalItem: number;
  readonly totalPrice: number;
  readonly dataUser: UserOrderDto;
  readonly status: Status;
  readonly item: ProductOrderDto[];
}

class Status {
  @IsNotEmpty()
  @IsBoolean()
  readonly isPaid: boolean;
  readonly desc: string;
}
