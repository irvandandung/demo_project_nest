import { Document } from 'mongoose';
import { ProductOrder } from './../interface/productOrder.interface';
import { UserOrder } from './../interface/userOrder.interface';

const nameOrderEntity = 'Order';

interface Order extends Document {
    totalItem : number;
    totalPrice : number;
    dataUser : UserOrder;
    status: {
        isPaid: boolean;
        ket: string;
    };
    item : ProductOrder[];
}

export { nameOrderEntity, Order }