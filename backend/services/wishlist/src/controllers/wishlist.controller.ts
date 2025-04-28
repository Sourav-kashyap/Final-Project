import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Wishlist} from '../models';
import {WishlistRepository} from '../repositories';

export class WishlistController {
  constructor(
    @repository(WishlistRepository)
    public wishlistRepository: WishlistRepository,
  ) {}

  @post('/wishlists')
  @response(200, {
    description: 'Wishlist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Wishlist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {
            title: 'NewWishlist',
            exclude: ['id'],
          }),
        },
      },
    })
    wishlist: Omit<Wishlist, 'id'>,
  ): Promise<Wishlist> {
    return this.wishlistRepository.create(wishlist);
  }

  @get('/wishlists/count')
  @response(200, {
    description: 'Wishlist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Wishlist) where?: Where<Wishlist>): Promise<Count> {
    return this.wishlistRepository.count(where);
  }

  @get('/wishlists')
  @response(200, {
    description: 'Array of Wishlist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Wishlist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Wishlist) filter?: Filter<Wishlist>,
  ): Promise<Wishlist[]> {
    return this.wishlistRepository.find(filter);
  }

  @get('/wishlists/{id}')
  @response(200, {
    description: 'Wishlist model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Wishlist, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Wishlist, {exclude: 'where'})
    filter?: FilterExcludingWhere<Wishlist>,
  ): Promise<Wishlist> {
    return this.wishlistRepository.findById(id, filter);
  }

  @patch('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {partial: true}),
        },
      },
    })
    wishlist: Wishlist,
  ): Promise<void> {
    await this.wishlistRepository.updateById(id, wishlist);
  }

  @del('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wishlistRepository.deleteById(id);
  }
}
