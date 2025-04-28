import {get, post, patch, del, param, requestBody} from '@loopback/rest';
import axios from 'axios';
import {Cart} from '../interface/interfaces';
import {Filter, FilterExcludingWhere, Where, Count} from '@loopback/repository';
import {handleError} from '../utils/errorHandle';

export class CartController {
  private cartBaseURL = 'http://localhost:3006';

  constructor() {}

  @post('/carts')
  async createCart(@requestBody() cart: Cart): Promise<Cart | string> {
    try {
      const response = await axios.post(`${this.cartBaseURL}/carts`, cart);
      return response.data;
    } catch (error) {
      // Handling axios error
      console.error(
        'Error creating cart:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create cart');
    }
  }

  @get('/carts/count')
  async countCarts(
    @param.query.object('where') where?: Where<Cart>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(`${this.cartBaseURL}/carts/count`, {
        params: {where: JSON.stringify(where)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error counting carts:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count carts');
    }
  }

  @get('/carts')
  async getCarts(
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[] | string> {
    try {
      const response = await axios.get(`${this.cartBaseURL}/carts`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching carts:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get carts');
    }
  }

  @get('/carts/{id}')
  async getCartById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Cart>,
  ): Promise<Cart | string> {
    try {
      const response = await axios.get(`${this.cartBaseURL}/carts/${id}`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching cart by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get cart by ID');
    }
  }

  @patch('/carts/{id}')
  async updateCartById(
    @param.path.string('id') id: string,
    @requestBody() cart: Cart,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.cartBaseURL}/carts/${id}`, cart);
    } catch (error) {
      console.error(
        'Error updating cart:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update cart');
    }
  }

  @del('/carts/{id}')
  async deleteCartById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.cartBaseURL}/carts/${id}`);
    } catch (error) {
      console.error(
        'Error deleting cart:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete cart');
    }
  }
}
