import {model, Entity, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {ProductCategory} from './product-category.model';

@model({name: 'Categories'})
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  categoryId?: number;

  @property({
    type: 'string',
    required: true,
  })
  categoryName: string;

  @property({
    type: 'string',
    required: false,
  })
  imageUrl?: string;

  @property({
    type: 'string', 
    required: true
  })
  slug: string;

  @hasMany(() => Product, {
    through: {model: () => ProductCategory, keyFrom: 'categoryId', keyTo: 'productId'},
  })
  products?: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {}
export type CategoryWithRelations = Category & CategoryRelations;
