import {Model, model, Entity, property} from '@loopback/repository';

@model({name: 'Addresses'})
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  addressId?: number;

  @property({
    type: 'number',
    required: true,
  })
  customerId: number;

  @property({
    type: 'string',
    required: true,
  })
  addressLine: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  postalCode: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {}
export type AddressWithRelations = Address & AddressRelations;
