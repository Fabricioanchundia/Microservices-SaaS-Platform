import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InternalGuard } from './Internal.Guard';

@Controller('notifications')
@UseGuards(InternalGuard)
export class NotificationsController {

  @Post('order-created')
  orderCreated(@Body() body: any) {
    console.log('📨 Notification received:', body);

    return {
      success: true,
      message: 'Order notification sent',
    };
  }
}

