import {
  Body,
  Controller,
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

  // =========================
  // CREATE ORDER (POST)
  // =========================
  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    const internalApiKey = process.env.INTERNAL_API_KEY;
    if (!internalApiKey) {
      throw new InternalServerErrorException(
        'INTERNAL_API_KEY is not configured',
      );
    }

    return this.ordersProxy.forward('POST', '/', body, {
      'x-user-id': user.sub,
      'x-internal-key': internalApiKey,
    });
  }

  // =========================
  // LIST ORDERS (GET)
  // =========================
  @Get()
  list(@CurrentUser() user: any) {
    const internalApiKey = process.env.INTERNAL_API_KEY;
    if (!internalApiKey) {
      throw new InternalServerErrorException(
        'INTERNAL_API_KEY is not configured',
      );
    }

    return this.ordersProxy.forward('GET', '/', null, {
      'x-user-id': user.sub,
      'x-internal-key': internalApiKey,
    });
  }

  // =========================
  // GET ORDER BY ID
  // =========================
  @Get(':id')
  getById(@Param('id') id: string, @CurrentUser() user: any) {
    const internalApiKey = process.env.INTERNAL_API_KEY;
    if (!internalApiKey) {
      throw new InternalServerErrorException(
        'INTERNAL_API_KEY is not configured',
      );
    }

    return this.ordersProxy.forward('GET', `/${id}`, null, {
      'x-user-id': user.sub,
      'x-internal-key': internalApiKey,
    });
  }

  // =========================
  // UPDATE STATUS
  // =========================
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: any,
    @CurrentUser() user: any,
  ) {
    const internalApiKey = process.env.INTERNAL_API_KEY;
    if (!internalApiKey) {
      throw new InternalServerErrorException(
        'INTERNAL_API_KEY is not configured',
      );
    }

    return this.ordersProxy.forward('PATCH', `/${id}/status`, body, {
      'x-user-id': user.sub,
      'x-internal-key': internalApiKey,
    });
  }
}
