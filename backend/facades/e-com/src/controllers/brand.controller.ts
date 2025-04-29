import {get, post, patch, del, param, requestBody} from '@loopback/rest';
import axios from 'axios';
import {Brand} from '../interface/interfaces';
import {handleError} from '../utils/errorHandle';
import {Count, Filter, FilterExcludingWhere, Where} from '@loopback/repository';

export class BrandController {
  private brandBaseURL = 'http://localhost:3007';

  constructor() {}

  @post('/brands')
  async createBrand(@requestBody() brand: Brand): Promise<Brand | string> {
    try {
      const response = await axios.post(`${this.brandBaseURL}/brands`, brand);
      return response.data;
    } catch (error) {
      // Handling axios error
      console.error(
        'Error creating brand:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create brand');
    }
  }

  @get('/brands/count')
  async countBrands(
    @param.query.object('where') where?: Where<Brand>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(`${this.brandBaseURL}/brands/count`, {
        params: {where: JSON.stringify(where)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error counting brands:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count brands');
    }
  }

  @get('/brands')
  async getBrands(
    @param.query.object('filter') filter?: Filter<Brand>,
  ): Promise<Brand[] | string> {
    try {
      const response = await axios.get(`${this.brandBaseURL}/brands`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching brands:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get brands');
    }
  }

  @get('/brands/{id}')
  async getBrandById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Brand>,
  ): Promise<Brand | string> {
    try {
      const response = await axios.get(`${this.brandBaseURL}/brands/${id}`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching brand by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get brand by ID');
    }
  }

  @patch('/brands/{id}')
  async updateBrandById(
    @param.path.string('id') id: string,
    @requestBody() brand: Partial<Brand>,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.brandBaseURL}/brands/${id}`, brand);
    } catch (error) {
      console.error(
        'Error updating brand:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update brand');
    }
  }

  @del('/brands/{id}')
  async deleteBrandById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.brandBaseURL}/brands/${id}`);
    } catch (error) {
      console.error(
        'Error deleting brand:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete brand');
    }
  }
}
