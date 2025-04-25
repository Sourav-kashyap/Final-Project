import dotenv from 'dotenv';
dotenv.config();
import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {sign} from 'jsonwebtoken';
import {HttpErrors} from '@loopback/rest';
import {compare, hash} from 'bcrypt';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {inject} from '@loopback/core';

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
    credentials: {
      email: string;
      password: string;
    },
  ): Promise<{token: string}> {
    try {
      const users = await this.userRepository.find();

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
  @post('/signup/user')
  async signupUser(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['id', 'email', 'password', 'firstName', 'lastName'], // Added 'id' to required fields
            properties: {
              id: {type: 'string'}, // ID is now required for user signup
              email: {type: 'string'},
              password: {type: 'string'},
              firstName: {type: 'string'},
              lastName: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {
      id: string; // Ensure 'id' is passed in the request body
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ): Promise<{token: string}> {
    // Check if email already exists
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
      role: 'user', // Default role
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

  // 🛡️ Signup Route for Admins (only accessible by an admin)
  @post('/signup/admin')
  async signupAdmin(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['id', 'email', 'password', 'firstName', 'lastName'],
            properties: {
              id: {type: 'string'},
              email: {type: 'string'},
              password: {type: 'string'},
              firstName: {type: 'string'},
              lastName: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {
      id: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    @inject(SecurityBindings.USER)
    currentUser: UserProfile, // Authenticated user is injected here
  ): Promise<{token: string}> {
    // Only allow admin users to access this route
    if (currentUser.role !== 'admin') {
      throw new HttpErrors.Forbidden('Only admins can create other admins.');
    }

    // Check if the email already exists
    const existing = await this.userRepository.findOne({
      where: {email: credentials.email.toLowerCase()},
    });
    if (existing) {
      throw new HttpErrors.BadRequest('Email already exists.');
    }

    // Hash password
    const hashedPassword = await hash(credentials.password, 10);

    // Create new admin user
    const admin = await this.userRepository.create({
      id: credentials.id,
      email: credentials.email.toLowerCase(),
      password: hashedPassword,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      role: 'admin',
    });

    // Sign JWT token for the new admin
    const token = sign(
      {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
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
