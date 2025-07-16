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
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Order} from '../models';
import {HttpErrors} from '@loopback/rest';
import {OrderRepository} from '../repositories';
import {OrderItemRepository} from '../repositories';
import {CustomerRepository} from '../repositories';
import {AddressRepository} from '../repositories';
import {ProductRepository} from '../repositories';

export interface OrderRequestItem {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  customerId: number;
  addressId: number;
  items: OrderRequestItem[];
}

export class OrdersController {
  constructor(
    @repository(OrderRepository)
    public orderRepository : OrderRepository,
    @repository(OrderItemRepository)
    public orderItemRepository: OrderItemRepository,
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  /*
  @post('/orders')
  @response(200, {
    description: 'Order model instance',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrder',
            exclude: ['orderId'],
          }),
        },
      },
    })
    order: Omit<Order, 'orderId'>,
  ): Promise<Order> {
    return this.orderRepository.create(order);
  }
  */

  // Create order method that checks for specific constraints 
  @post('/orders/create-order')
  @response(200, {
    description: 'Order successfully created',
    content: {'application/json': {schema: getModelSchemaRef(Order)}},
  })
  async createOrder(
    @requestBody() orderRequest: OrderRequest,
  ): Promise<Order> {
    // Check if customer exists
    const customer = await this.customerRepository.findById(orderRequest.customerId);
    if (!customer) {
      throw new HttpErrors.NotFound(`Customer ${orderRequest.customerId} not found`);
    }
  
    // Check if the address exists
    const address = await this.addressRepository.findById(orderRequest.addressId);
    if (!address) {
      throw new HttpErrors.NotFound(`Address ${orderRequest.addressId} not found`);
    }
    if (address.customerId !== orderRequest.customerId) {
      throw new HttpErrors.BadRequest(`Address does not belong to customer`);
    }
  
    let totalAmount = 0;
  
    // Check each product
    for (const item of orderRequest.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new HttpErrors.NotFound(`Product ${item.productId} not found`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new HttpErrors.BadRequest(`Not enough stock for product ${item.productId}`);
      }
      totalAmount += product.price * item.quantity;
    }
  
    // Create the Order
    const order = await this.orderRepository.create({
      customerId: orderRequest.customerId,
      addressId: orderRequest.addressId,
      orderDate: new Date().toISOString(),
      totalAmount,
      status: 'Sipariş Alındı',
    });
  
    // Create OrderItems and reduce stock
    for (const item of orderRequest.items) {
      const product = await this.productRepository.findById(item.productId);
  
      await this.orderItemRepository.create({
        orderId: order.orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      });
  
      // update product stock
      await this.productRepository.updateById(item.productId, {
        stockQuantity: product.stockQuantity - item.quantity,
      });
    }
  
    return order;
  }

  @get('/orders/count')
  @response(200, {
    description: 'Order model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.count(where);
  }

  @get('/orders')
  @response(200, {
    description: 'Array of Order model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Order, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Order) filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.orderRepository.find(filter);
  }

  @patch('/orders')
  @response(200, {
    description: 'Order PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
    @param.where(Order) where?: Where<Order>,
  ): Promise<Count> {
    return this.orderRepository.updateAll(order, where);
  }

  @get('/orders/{id}')
  @response(200, {
    description: 'Order model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Order, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Order, {exclude: 'where'}) filter?: FilterExcludingWhere<Order>
  ): Promise<Order> {
    return this.orderRepository.findById(id, filter);
  }

  @patch('/orders/{id}')
  @response(204, {
    description: 'Order PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Order,
  ): Promise<void> {
    await this.orderRepository.updateById(id, order);
  }

  @put('/orders/{id}')
  @response(204, {
    description: 'Order PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ): Promise<void> {
    await this.orderRepository.replaceById(id, order);
  }

  @del('/orders/{id}')
  @response(204, {
    description: 'Order DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
