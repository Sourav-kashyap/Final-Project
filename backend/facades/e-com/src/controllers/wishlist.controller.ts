import {get, post, patch, del, param, requestBody} from '@loopback/rest';
import axios from 'axios';
import {Wishlist} from '../interface/interfaces';
import {Filter, FilterExcludingWhere, Where, Count} from '@loopback/repository';
import {handleError} from '../utils/errorHandle';

export class WishlistFaWishlistControllercade {
  private wishlistBaseURL = 'http://localhost:3005';

  constructor() {}

  @post('/wishlists')
  async createWishlist(
    @requestBody() wishlist: Wishlist,
  ): Promise<Wishlist | string> {
    try {
      const response = await axios.post(
        `${this.wishlistBaseURL}/wishlists`,
        wishlist,
      );
      return response.data;
    } catch (error) {
      // Handling axios error
      console.error(
        'Error creating wishlist:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create wishlist');
    }
  }

  @get('/wishlists/count')
  async countWishlists(
    @param.query.object('where') where?: Where<Wishlist>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(
        `${this.wishlistBaseURL}/wishlists/count`,
        {
          params: {where: JSON.stringify(where)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error counting wishlists:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count wishlists');
    }
  }

  @get('/wishlists')
  async getWishlists(
    @param.query.object('filter') filter?: Filter<Wishlist>,
  ): Promise<Wishlist[] | string> {
    try {
      const response = await axios.get(`${this.wishlistBaseURL}/wishlists`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching wishlists:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get wishlists');
    }
  }

  @get('/wishlists/{id}')
  async getWishlistById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Wishlist>,
  ): Promise<Wishlist | string> {
    try {
      const response = await axios.get(
        `${this.wishlistBaseURL}/wishlists/${id}`,
        {
          params: {filter: JSON.stringify(filter)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching wishlist by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get wishlist by ID');
    }
  }

  @patch('/wishlists/{id}')
  async updateWishlistById(
    @param.path.string('id') id: string,
    @requestBody() wishlist: Wishlist,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.wishlistBaseURL}/wishlists/${id}`, wishlist);
    } catch (error) {
      console.error(
        'Error updating wishlist:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update wishlist');
    }
  }

  @del('/wishlists/{id}')
  async deleteWishlistById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.wishlistBaseURL}/wishlists/${id}`);
    } catch (error) {
      console.error(
        'Error deleting wishlist:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete wishlist');
    }
  }
}
