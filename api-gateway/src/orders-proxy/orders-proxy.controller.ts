import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersProxyService } from './orders-proxy.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersProxyController {
  constructor(private readonly ordersProxy: OrdersProxyService) {}

  @Get()
  list(@CurrentUser() user: any) {
    return this.ordersProxy.forward('GET', '/orders', null, {
      'x-user-id': user.sub,
      'x-user-role': user.role,
      'x-user-email': user.email,
    });
  }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersProxy.forward('GET', `/orders/${id}`, null, {
      'x-user-id': user.sub,
      'x-user-role': user.role,
      'x-user-email': user.email,
    });
  }

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.ordersProxy.forward('POST', '/orders', body, {
      'x-user-id': user.sub,
      'x-user-role': user.role,
      'x-user-email': user.email,
    });
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: any, @CurrentUser() user: any) {
    return this.ordersProxy.forward('PATCH', `/orders/${id}/status`, body, {
      'x-user-id': user.sub,
      'x-user-role': user.role,
      'x-user-email': user.email,
    });
  }
}
