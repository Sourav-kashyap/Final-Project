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
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {authenticate} from '@loopback/authentication';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get('/users')
  @authenticate('jwt') // Ensure the route is protected
  async find(
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<User[]> {
    try {
      if (currentUser.role !== 'admin') {
        throw new HttpErrors.Forbidden('Access denied. Admins only.');
      }

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

  @authenticate('jwt')
  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<User> {
    try {
      // Check if current user is admin or trying to delete their own account
      const isAdmin = currentUser.role === 'admin';
      const isOwner = currentUser.id === id;

      if (!isAdmin && !isOwner) {
        throw new HttpErrors.Forbidden(
          'You are not allowed to delete this user.',
        );
      }

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

  @authenticate('jwt')
  @patch('/user/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      description: 'Partial user data to update',
      content: {
        'application/json': {
          schema: {
            'x-ts-type': User,
          },
        },
      },
    })
    userData: Partial<User>,
    @inject(SecurityBindings.USER) currentUser: UserProfile,
  ): Promise<void> {
    try {
      const isAdmin = currentUser.role === 'admin';
      const isOwner = currentUser.id === id;

      if (!isAdmin && !isOwner) {
        throw new HttpErrors.Forbidden(
          'You are not allowed to update this user.',
        );
      }

      const userExists = await this.userRepository.exists(id);
      if (!userExists) {
        throw new HttpErrors.NotFound(`User with id ${id} not found.`);
      }

      await this.userRepository.updateById(id, userData);
    } catch (error) {
      if (error instanceof HttpErrors.HttpError) {
        throw error;
      }
      throw new HttpErrors.InternalServerError(
        `Failed to update user: ${error.message}`,
      );
    }
  }
}
