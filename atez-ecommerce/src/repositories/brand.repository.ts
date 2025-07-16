import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {Brand, BrandRelations} from '../models';

export class BrandRepository extends DefaultCrudRepository<
  Brand,
  typeof Brand.prototype.brandId,
  BrandRelations
> {
  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
  ) {
    super(Brand, dataSource);
  }
}
