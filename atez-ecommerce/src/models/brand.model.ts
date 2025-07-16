import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'Brands'})
export class Brand extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  brandId?: number;

  @property({
    type: 'string',
    required: true,
  })
  brandName: string;

  constructor(data?: Partial<Brand>) {
    super(data);
  }
}

export interface BrandRelations {}
export type BrandWithRelations = Brand & BrandRelations;
