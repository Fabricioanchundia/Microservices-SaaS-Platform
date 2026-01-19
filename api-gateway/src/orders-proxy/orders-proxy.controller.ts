import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  private getInternalApiKey(): string {
    const key = process.env.INTERNAL_API_KEY;
    if (!key) {
      throw new InternalServerErrorException('INTERNAL_API_KEY is not set');
    }
    return key;
  }

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.ordersProxy.forward('POST', '/', body, {
      'x-user-id': user.sub,
      'x-user-email': user.email,
      'x-user-role': user.role,
      'x-internal-key': this.getInternalApiKey(),
    });
  }

  // ✅ ADMIN
  @Get('admin/all')
  listAllAdmin(@CurrentUser() user: any) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Admin only');
    }

    return this.ordersProxy.forward('GET', '/admin/all', null, {
      'x-internal-key': this.getInternalApiKey(),
    });
  }

  @Get()
  list(@CurrentUser() user: any) {
    return this.ordersProxy.forward('GET', '/', null, {
      'x-user-id': user.sub,
      'x-internal-key': this.getInternalApiKey(),
    });
  }

  @Get(':id')
  getById(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersProxy.forward('GET', `/${id}`, null, {
      'x-user-id': user.sub,
      'x-internal-key': this.getInternalApiKey(),
    });
  }
  @Patch(':id/status')
  updateStatus(
  @Param('id') id: string,
  @Body() body: any,
  @CurrentUser() user: any,
) {
  return this.ordersProxy.forward('PATCH', `/${id}/status`, body, {
    'x-user-id': user.sub,
    'x-user-role': user.role, // 🔥 ESTA LÍNEA ES CLAVE
    'x-internal-key': this.getInternalApiKey(),
    });
  }
}
