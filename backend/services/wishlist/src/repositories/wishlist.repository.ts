import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WishlistDataSource} from '../datasources';
import {Wishlist, WishlistRelations} from '../models';

export class WishlistRepository extends DefaultCrudRepository<
  Wishlist,
  typeof Wishlist.prototype.id,
  WishlistRelations
> {
  constructor(
    @inject('datasources.wishlist') dataSource: WishlistDataSource,
  ) {
    super(Wishlist, dataSource);
  }
}
