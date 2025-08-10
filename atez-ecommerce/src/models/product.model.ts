import {model, Entity, property, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {ProductCategory} from './product-category.model';

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

  @hasMany(() => Category, {
    through: {model: () => ProductCategory, keyFrom: 'productId', keyTo: 'categoryId'},
  })
  categories?: Category[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {}
export type ProductWithRelations = Product & ProductRelations;
