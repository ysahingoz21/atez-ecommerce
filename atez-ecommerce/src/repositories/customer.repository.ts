import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {Customer, CustomerRelations} from '../models';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customerId,
  CustomerRelations
> {
  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
  ) {
    super(Customer, dataSource);
  }
}
