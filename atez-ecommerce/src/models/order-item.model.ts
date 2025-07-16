import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'OrderItems'})
export class OrderItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  orderItemId?: number;

  @property({
    type: 'number',
    required: true,
  })
  orderId: number;

  @property({
    type: 'number',
    required: true,
  })
  productId: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  unitPrice: number;

  constructor(data?: Partial<OrderItem>) {
    super(data);
  }
}

export interface OrderItemRelations {}
export type OrderItemWithRelations = OrderItem & OrderItemRelations;
