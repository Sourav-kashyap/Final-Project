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
import {Category} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  @post('/categories')
  @response(200, {
    description: 'Category model instance',
    content: {'application/json': {schema: getModelSchemaRef(Category)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
          }),
        },
      },
    })
    category: Category,
  ): Promise<Category> {
    try {
      if (!category || !category.name) {
        throw new HttpErrors.BadRequest('Category name is required.');
      }
      return await this.categoryRepository.create(category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw new HttpErrors.InternalServerError('An unexpected error occurred.');
    }
  }

  @get('/categories/count')
  @response(200, {
    description: 'Category model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Category) where?: Where<Category>): Promise<Count> {
    try {
      return await this.categoryRepository.count(where);
    } catch (error) {
      console.error('Error counting categories:', error);
      throw new HttpErrors.InternalServerError('Error counting categories.');
    }
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Category model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Category) filter?: Filter<Category>,
  ): Promise<Category[]> {
    try {
      return await this.categoryRepository.find(filter);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new HttpErrors.InternalServerError('Error fetching categories.');
    }
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Category, {exclude: 'where'})
    filter?: FilterExcludingWhere<Category>,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id, filter);
      if (!category) {
        throw new HttpErrors.NotFound(`Category with id ${id} not found.`);
      }
      return category;
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error;
      }
      console.error('Error fetching category by ID:', error);
      throw new HttpErrors.InternalServerError(
        'Error fetching category by ID.',
      );
    }
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Category PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
  ): Promise<void> {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new HttpErrors.NotFound(`Category with id ${id} not found.`);
      }
      await this.categoryRepository.updateById(id, category);
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error;
      }
      console.error('Error updating category:', error);
      throw new HttpErrors.InternalServerError('Error updating category.');
    }
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Category DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new HttpErrors.NotFound(`Category with id ${id} not found.`);
      }
      await this.categoryRepository.deleteById(id);
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error;
      }
      console.error('Error deleting category:', error);
      throw new HttpErrors.InternalServerError('Error deleting category.');
    }
  }
}
