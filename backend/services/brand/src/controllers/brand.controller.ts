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
import {Brand} from '../models';
import {BrandRepository} from '../repositories';

export class BrandController {
  constructor(
    @repository(BrandRepository)
    public brandRepository: BrandRepository,
  ) {}

  @post('/brands')
  @response(200, {
    description: 'Brand model instance',
    content: {'application/json': {schema: getModelSchemaRef(Brand)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Brand, {
            title: 'NewBrand',
          }),
        },
      },
    })
    brand: Brand,
  ): Promise<Brand> {
    try {
      return await this.brandRepository.create(brand);
    } catch (error) {
      throw new HttpErrors.BadRequest(`Error creating brand: ${error.message}`);
    }
  }

  @get('/brands/count')
  @response(200, {
    description: 'Brand model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Brand) where?: Where<Brand>): Promise<Count> {
    try {
      return await this.brandRepository.count(where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        `Error counting brands: ${error.message}`,
      );
    }
  }

  @get('/brands')
  @response(200, {
    description: 'Array of Brand model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Brand, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Brand) filter?: Filter<Brand>): Promise<Brand[]> {
    try {
      return await this.brandRepository.find(filter);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        `Error retrieving brands: ${error.message}`,
      );
    }
  }

  @get('/brands/{id}')
  @response(200, {
    description: 'Brand model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Brand, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Brand, {exclude: 'where'})
    filter?: FilterExcludingWhere<Brand>,
  ): Promise<Brand> {
    try {
      const brand = await this.brandRepository.findById(id, filter);
      if (!brand) {
        throw new HttpErrors.NotFound(`Brand with id ${id} not found`);
      }
      return brand;
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error; // Already handled error
      }
      throw new HttpErrors.InternalServerError(
        `Error finding brand by id: ${error.message}`,
      );
    }
  }

  @get('/brandsWithSame/{id}')
  @response(200, {
    description: 'Brand model instances with the same ID',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Brand),
      },
    },
  })
  async findAllWithSameId(
    @param.path.string('id') id: string,
  ): Promise<Brand[]> {
    try {
      const brands = await this.brandRepository.find({
        where: {categoryId: id},
      });

      if (brands.length === 0) {
        throw new HttpErrors.NotFound(`Brands with id ${id} not found`);
      }

      return brands;
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error; // Already handled error
      }
      throw new HttpErrors.InternalServerError(
        `Error finding brands by id: ${error.message}`,
      );
    }
  }

  @patch('/brands/{id}')
  @response(204, {
    description: 'Brand PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Brand, {partial: true}),
        },
      },
    })
    brand: Brand,
  ): Promise<void> {
    try {
      await this.brandRepository.updateById(id, brand);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        `Error updating brand: ${error.message}`,
      );
    }
  }

  @del('/brands/{id}')
  @response(204, {
    description: 'Brand DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    try {
      await this.brandRepository.deleteById(id);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        `Error deleting brand: ${error.message}`,
      );
    }
  }
}
