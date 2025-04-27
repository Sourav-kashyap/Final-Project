import {get, post, patch, del, param, requestBody} from '@loopback/rest';
import axios from 'axios';
import {Category} from '../interface/interfaces';
import {Filter, FilterExcludingWhere, Where, Count} from '@loopback/repository';
import {handleError} from '../utils/errorHandle';

export class CategoryController {
  private categoryBaseURL = 'http://localhost:3002';

  constructor() {}

  @post('/categories')
  async createCategory(
    @requestBody() category: Category,
  ): Promise<Category | string> {
    try {
      const response = await axios.post(
        `${this.categoryBaseURL}/categories`,
        category,
      );
      return response.data;
    } catch (error) {
      // Handling axios error
      console.error(
        'Error creating category:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create category');
    }
  }

  @get('/categories/count')
  async countCategories(
    @param.query.object('where') where?: Where<Category>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(
        `${this.categoryBaseURL}/categories/count`,
        {
          params: {where: JSON.stringify(where)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error counting categories:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count categories');
    }
  }

  @get('/categories')
  async getCategories(
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[] | string> {
    try {
      const response = await axios.get(`${this.categoryBaseURL}/categories`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching categories:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get categories');
    }
  }

  @get('/categories/{id}')
  async getCategoryById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Category>,
  ): Promise<Category | string> {
    try {
      const response = await axios.get(
        `${this.categoryBaseURL}/categories/${id}`,
        {
          params: {filter: JSON.stringify(filter)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching category by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get category by ID');
    }
  }

  @patch('/categories/{id}')
  async updateCategoryById(
    @param.path.string('id') id: string,
    @requestBody() category: Partial<Category>,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.categoryBaseURL}/categories/${id}`, category);
    } catch (error) {
      console.error(
        'Error updating category:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update category');
    }
  }

  @del('/categories/{id}')
  async deleteCategoryById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.categoryBaseURL}/categories/${id}`);
    } catch (error) {
      console.error(
        'Error deleting category:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete category');
    }
  }
}
