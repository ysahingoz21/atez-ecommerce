import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {CustomerRepository} from '../repositories';
import {Customer} from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'defaultFallbackSecret';

export class AuthorizationController {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {}

  @post('/auth/register')
  async register(
    @requestBody() customerData: Omit<Customer, 'customerId'> & {password: string},
  ): Promise<{message: string}> {
    // Check if email already exists
    const existingCustomer = await this.customerRepository.findOne({
      where: {email: customerData.email},
    });
    if (existingCustomer) {
      throw new HttpErrors.BadRequest('Email already registered');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(customerData.password, 10);

    // Create the customer
    await this.customerRepository.create({
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      passwordHash,
    });

    return {message: 'Registration successful'};
  }

  @post('/auth/login')
  async login(
    @requestBody() credentials: {email: string; password: string},
  ): Promise<{token: string}> {
    const customer = await this.customerRepository.findOne({
      where: {email: credentials.email},
    });

    if (!customer) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(
      credentials.password,
      customer.passwordHash,
    );

    if (!passwordValid) {
      throw new HttpErrors.Unauthorized('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign(
      {
        customerId: customer.customerId,
        email: customer.email,
      },
      JWT_SECRET,
      {expiresIn: '2h'},
    );

    return {token};
  }
}
