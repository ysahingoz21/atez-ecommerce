import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'Products'})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  productId?: number;

  @property({
    type: 'number',
    required: true,
  })
  brandId: number;

  @property({
    type: 'string',
    required: true,
  })
  productName: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  stockQuantity: number;

  @property({
    type: 'string',
  })
  imageUrl?: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {}
export type ProductWithRelations = Product & ProductRelations;
