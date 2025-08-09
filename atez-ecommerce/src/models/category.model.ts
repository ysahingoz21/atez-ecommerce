import {Model, model, Entity, property} from '@loopback/repository';

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

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {}
export type CategoryWithRelations = Category & CategoryRelations;
