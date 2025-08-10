import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {AtezEcommerceDataSource} from '../datasources';
import {Product, Category, ProductCategory, ProductRelations} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductCategoryRepository} from './product-category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  {}
> {
  public readonly categories: HasManyThroughRepositoryFactory<
    Category,
    typeof Category.prototype.categoryId,
    ProductCategory,
    typeof Product.prototype.productId
  >;

  constructor(
    @inject('datasources.AtezEcommerce') dataSource: AtezEcommerceDataSource,
    @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
    @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>,
  ) {
    super(Product, dataSource);
    this.categories = this.createHasManyThroughRepositoryFactoryFor(
      'categories',
      this.categoryRepositoryGetter,
      this.productCategoryRepositoryGetter,
    );
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
