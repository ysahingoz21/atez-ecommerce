import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {Category, Product, ProductCategory} from '../models';
import {ProductRepository} from './product.repository';
import {ProductCategoryRepository} from './product-category.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.categoryId,
  {}
> {
  public readonly products: HasManyThroughRepositoryFactory<
    Product,
    typeof Product.prototype.productId,
    ProductCategory,
    typeof Category.prototype.categoryId
  >;

  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
    @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
    @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor(
      'products',
      this.productRepositoryGetter,
      this.productCategoryRepositoryGetter,
    );
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
