import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'CartItems'})
export class CartItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cartItemId?: number;

  @property({
    type: 'number',
    required: true,
  })
  customerId: number;

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

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {}
export type CartItemWithRelations = CartItem & CartItemRelations;
