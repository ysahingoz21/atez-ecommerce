import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'Orders'})
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  orderId?: number;

  @property({
    type: 'number',
    required: true,
  })
  customerId: number;

  @property({
    type: 'number',
    required: true,
  })
  addressId: number;

  @property({
    type: 'string',
    required: true,
  })
  orderDate: string;

  @property({
    type: 'number',
    required: true,
  })
  totalAmount: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {}
export type OrderWithRelations = Order & OrderRelations;
