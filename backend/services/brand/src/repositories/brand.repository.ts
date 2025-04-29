import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BrandDataSource} from '../datasources';
import {Brand, BrandRelations} from '../models';

export class BrandRepository extends DefaultCrudRepository<
  Brand,
  typeof Brand.prototype.id,
  BrandRelations
> {
  constructor(
    @inject('datasources.brand') dataSource: BrandDataSource,
  ) {
    super(Brand, dataSource);
  }
}
