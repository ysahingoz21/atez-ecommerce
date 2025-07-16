import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'ProductCategories'})
export class ProductCategory extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  productId: number;

  @property({
    type: 'number',
    id: true,
  })
  categoryId: number;

  constructor(data?: Partial<ProductCategory>) {
    super(data);
  }
}

export interface ProductCategoryRelations {}
export type ProductCategoryWithRelations = ProductCategory & ProductCategoryRelations;
