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
  HttpErrors,
} from '@loopback/rest';
import {Cart} from '../models';
import {CartRepository} from '../repositories';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) {}

  @post('/carts')
  @response(200, {
    description: 'Cart model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cart)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
          }),
        },
      },
    })
    cart: Omit<Cart, 'id'>,
  ): Promise<Cart> {
    return this.cartRepository.create(cart);
  }

  @get('/carts/count')
  @response(200, {
    description: 'Cart model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Cart) where?: Where<Cart>): Promise<Count> {
    return this.cartRepository.count(where);
  }

  @get('/carts')
  @response(200, {
    description: 'Array of Cart model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cart, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Cart) filter?: Filter<Cart>): Promise<Cart[]> {
    return this.cartRepository.find(filter);
  }

  @get('/carts/{id}')
  @response(200, {
    description: 'Cart model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cart, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cart, {exclude: 'where'}) filter?: FilterExcludingWhere<Cart>,
  ): Promise<Cart> {
    return this.cartRepository.findById(id, filter);
  }

  @patch('/carts/{id}')
  @response(204, {
    description: 'Cart PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Cart,
  ): Promise<void> {
    await this.cartRepository.updateById(id, cart);
  }

  @del('/carts/{id}')
  @response(204, {
    description: 'Cart DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartRepository.deleteById(id);
  }

  @get('/carts/user/{userId}')
  @response(200, {
    description: 'Find cart by user ID',
  })
  async findCartByUserId(
    @param.path.string('userId') userId: string,
  ): Promise<Cart | null> {
    return this.cartRepository.findOne({where: {userId}});
  }

  @del('/carts/{cartId}/product/{productId}')
  @response(204, {
    description: 'Single Product DELETE success from cart',
  })
  async deleteSingleProduct(
    @param.path.string('cartId') cartId: string,
    @param.path.string('productId') productId: string,
  ): Promise<void> {
    // Find the cart by cartId
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new HttpErrors.NotFound('Cart not found');
    }

    // Find the product within the cart and delete the first occurrence of it
    const productIndex = cart.productsId.findIndex(
      product => product === productId,
    );

    if (productIndex === -1) {
      throw new HttpErrors.NotFound('Product not found in cart');
    }

    // Remove the product from the cart
    cart.productsId.splice(productIndex, 1);

    // Save the updated cart back to the repository
    await this.cartRepository.updateById(cartId, cart);
  }
}
