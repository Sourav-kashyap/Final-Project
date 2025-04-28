import {get, post, patch, del, param, requestBody} from '@loopback/rest';
import axios from 'axios';
import {Order} from '../interface/interfaces';
import {Filter, FilterExcludingWhere, Where, Count} from '@loopback/repository';
import {handleError} from '../utils/errorHandle';

export class OrderController {
  private orderBaseURL = 'http://localhost:3003';

  constructor() {}

  @post('/orders')
  async createOrder(@requestBody() order: Order): Promise<Order | string> {
    try {
      const response = await axios.post(`${this.orderBaseURL}/orders`, order);
      return response.data;
    } catch (error) {
      // Handling axios error
      console.error(
        'Error creating order:',
        error.response?.data || error.message,
      );
      return handleError(error, 'create order');
    }
  }

  @get('/orders/count')
  async countOrders(
    @param.query.object('where') where?: Where<Order>,
  ): Promise<Count | string> {
    try {
      const response = await axios.get(`${this.orderBaseURL}/orders/count`, {
        params: {where: JSON.stringify(where)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error counting orders:',
        error.response?.data || error.message,
      );
      return handleError(error, 'count orders');
    }
  }

  @get('/orders')
  async getOrders(
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[] | string> {
    try {
      const response = await axios.get(`${this.orderBaseURL}/orders`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching orders:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get orders');
    }
  }

  @get('/orders/{id}')
  async getOrderById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: FilterExcludingWhere<Order>,
  ): Promise<Order | string> {
    try {
      const response = await axios.get(`${this.orderBaseURL}/orders/${id}`, {
        params: {filter: JSON.stringify(filter)},
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching order by ID:',
        error.response?.data || error.message,
      );
      return handleError(error, 'get order by ID');
    }
  }

  @patch('/orders/{id}')
  async updateOrderById(
    @param.path.string('id') id: string,
    @requestBody() order: Order,
  ): Promise<void | string> {
    try {
      await axios.patch(`${this.orderBaseURL}/orders/${id}`, order);
    } catch (error) {
      console.error(
        'Error updating order:',
        error.response?.data || error.message,
      );
      return handleError(error, 'update order');
    }
  }

  @del('/orders/{id}')
  async deleteOrderById(
    @param.path.string('id') id: string,
  ): Promise<void | string> {
    try {
      await axios.delete(`${this.orderBaseURL}/orders/${id}`);
    } catch (error) {
      console.error(
        'Error deleting order:',
        error.response?.data || error.message,
      );
      return handleError(error, 'delete order');
    }
  }
}
