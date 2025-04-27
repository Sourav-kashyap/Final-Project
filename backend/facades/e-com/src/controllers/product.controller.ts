import {
  get,
  post,
  patch,
  del,
  param,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import axios from 'axios';
import {Product} from '../interface/interfaces';
import {Filter, FilterExcludingWhere, Where, Count} from '@loopback/repository';
import {handleError} from '../utils/errorHandle';

export class ProductController {
  private productBaseURL = 'http://localhost:3003';
  private categoryBaseURL = 'http://localhost:3002';
  constructor() {}

  @post('/products')
  async createProduct(
    @requestBody() product: Product,
  ): Promise<Product | string> {
    try {
      const response = await axios.post(
        `${this.productBaseURL}/products`,
        product,
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error creating product:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create product');
    }
  }

  @get('/products/count')
  async countProducts(
    @param.query.object('where') where?: Where<Product>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(
        `${this.productBaseURL}/products/count`,
        {
          params: {where: JSON.stringify(where)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error counting products:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count products');
    }
  }

  @get('/products')
  async getProducts(
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[] | string> {
    try {
      const response = await axios.get(`${this.productBaseURL}/products`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching products:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get products');
    }
  }

  @get('/products/{id}')
  async getProductById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Product>,
  ): Promise<Product | string> {
    try {
      const response = await axios.get(
        `${this.productBaseURL}/products/${id}`,
        {
          params: {filter: JSON.stringify(filter)},
        },
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching product by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get product by ID');
    }
  }

  @patch('/products/{id}')
  async updateProductById(
    @param.path.string('id') id: string,
    @requestBody() product: Partial<Product>,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.productBaseURL}/products/${id}`, product);
    } catch (error) {
      console.error(
        'Error updating product:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update product');
    }
  }

  @del('/products/{id}')
  async deleteProductById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.productBaseURL}/products/${id}`);
    } catch (error) {
      console.error(
        'Error deleting product:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete product');
    }
  }

  @get('/products/{id}/category')
  async getCategoryOfProduct(
    @param.path.string('id') id: string,
  ): Promise<any | string> {
    try {
      const productResponse = await axios.get<Product>(
        `${this.productBaseURL}/products/${id}`,
      );
      const product = productResponse.data;

      if (!product) {
        throw new Error('Product not found');
      }

      const categoryId = product.categotyId;

      const categoryResponse = await axios.get(
        `${this.categoryBaseURL}/categories/${categoryId}`,
      );

      return categoryResponse.data;
    } catch (error) {
      console.error(
        'Error fetching category of product:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get category of product');
    }
  }
}
