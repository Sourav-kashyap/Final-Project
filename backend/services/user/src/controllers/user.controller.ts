import {repository} from '@loopback/repository';
import {
  get,
  del,
  patch,
  requestBody,
  param,
  HttpErrors,
  response,
} from '@loopback/rest';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get('/users')
  async find(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (!users || users.length === 0) {
        throw new HttpErrors.NotFound('No users found.');
      }
      return users;
    } catch (error) {
      console.error('Error during findUsers:', error.message);
      throw new HttpErrors.InternalServerError('Failed to retrieve users.');
    }
  }

  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({where: {id}});
      if (!user) {
        throw new HttpErrors.NotFound(`User with id ${id} not found.`);
      }

      await this.userRepository.deleteById(id);
      return user;
    } catch (error) {
      if (error instanceof HttpErrors.HttpError) {
        throw error;
      }
      throw new HttpErrors.InternalServerError(
        `An error occurred: ${error.message}`,
      );
    }
  }
}
