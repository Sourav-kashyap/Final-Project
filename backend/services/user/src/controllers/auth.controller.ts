import dotenv from 'dotenv';
dotenv.config();
import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {sign} from 'jsonwebtoken';
import {HttpErrors} from '@loopback/rest';
import {compare, hash} from 'bcrypt';
import {Login, Signup, Token} from '../interface/interfaces';

export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  // 🧑 login Route for Users or Admin
  @post('/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: Login,
  ): Promise<Token> {
    try {
      console.log('login controller:', credentials);

      // const users = await this.userRepository.find();

      const user = await this.userRepository.findOne({
        where: {email: credentials.email},
      });

      if (!user) {
        throw new HttpErrors.Unauthorized('Invalid credentials');
      }

      const isPasswordValid = await compare(
        credentials.password,
        user.password as string,
      );

      if (!isPasswordValid) {
        throw new HttpErrors.Unauthorized('Invalid password');
      }

      const token = sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1d',
          issuer: process.env.JWT_ISSUER,
        },
      );

      return {token};
    } catch (error) {
      console.error('Error during login:', error.message);
      if (error instanceof HttpErrors.HttpError) {
        throw error; // Re-throw HttpErrors to preserve the status code and message
      }
      throw new HttpErrors.InternalServerError('Login failed');
    }
  }

  // 🧑 Signup Route for Users
  @post('/signup')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'id',
              'email',
              'password',
              'firstName',
              'lastName',
              'role',
            ], // Added 'id' to required fields
            properties: {
              id: {type: 'string'}, // ID is now required for user signup
              email: {type: 'string'},
              password: {type: 'string'},
              firstName: {type: 'string'},
              lastName: {type: 'string'},
              role: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: Signup,
  ): Promise<Token> {
    // Check if email already exists
    console.log('signup controller:', credentials);

    const existing = await this.userRepository.findOne({
      where: {email: credentials.email.toLocaleLowerCase()},
    });
    if (existing) throw new HttpErrors.BadRequest('Email already exists.');

    // Check if ID already exists
    const existingUser = await this.userRepository.findOne({
      where: {id: credentials.id},
    });
    if (existingUser) throw new HttpErrors.BadRequest('ID already exists.');

    // Hash the password
    const hashedPassword = await hash(credentials.password, 10);

    // Create new user with the given credentials
    const user = await this.userRepository.create({
      id: credentials.id, // Save the user with the provided ID
      email: credentials.email.toLocaleLowerCase(),
      password: hashedPassword,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      role: credentials.role,
    });

    // Generate a JWT token for the new user
    const token = sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER,
      },
    );

    return {token};
  }
}
