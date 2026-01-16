import { Body, Controller, Headers, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {

  @Post()
  createOrder(
    @Headers('x-user-id') userId: string,
    @Body() body: any,
  ) {
    console.log('USER ID RECIBIDO:', userId);

    return {
      message: 'Order created',
      userId,
      data: {
        product: body.product ?? 'Laptop',
        price: body.price ?? 1200,
      },
    };
  }
}
