import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {Order, OrderRelations} from '../models';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderId,
  OrderRelations
> {
  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
  ) {
    super(Order, dataSource);
  }
}
