import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'brand',
  connector: 'postgresql',
  url: '',
  host: '127.0.0.1',
  port: 5432,
  user: 'sourav',
  password: 'sourav',
  database: 'brand'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BrandDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'brand';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.brand', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
