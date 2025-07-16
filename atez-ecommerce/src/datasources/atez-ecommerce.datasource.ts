import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgres',
  connector: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'atez123',
  database: 'atez-ecommerce'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AtezEcommerceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'AtezEcommerce';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.AtezEcommerce', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
