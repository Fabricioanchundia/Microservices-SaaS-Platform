import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Headers('x-user-id') userId: string,
    @Body() body: any,
  ) {
    const order = await this.ordersService.create(userId, body);

    return {
      message: 'Order created',
      data: order,
    };
  }

  @Get()
  async listOrders(@Headers('x-user-id') userId: string) {
    return this.ordersService.findByUser(userId);
  }
}
