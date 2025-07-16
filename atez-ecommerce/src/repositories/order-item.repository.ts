import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {OrderItem, OrderItemRelations} from '../models';

export class OrderItemRepository extends DefaultCrudRepository<
  OrderItem,
  typeof OrderItem.prototype.orderItemId,
  OrderItemRelations
> {
  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
  ) {
    super(OrderItem, dataSource);
  }
}
