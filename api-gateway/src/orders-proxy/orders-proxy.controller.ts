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
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersProxyController {
  constructor(private readonly ordersProxy: OrdersProxyService) {}

  // 🔐 Internal key SOLO para comunicación interna
  private getInternalApiKey(): string {
    const key = process.env.INTERNAL_API_KEY;
    if (!key) {
      throw new InternalServerErrorException('INTERNAL_API_KEY is not set');
    }
    return key;
  }

  // =========================
  // 🛒 USER
  // =========================

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.ordersProxy.forward('POST', '/', body, {
      'x-user-id': user.sub,
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

  // =========================
  // 🔥 ADMIN
  // =========================

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  listAllAdmin() {
    return this.ordersProxy.forward('GET', '/admin/all', null, {
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
    'x-user-id': String(user.sub),
    'x-user-role': String(user.role).toLowerCase(), // 🔥 CLAVE ABSOLUTA
    'x-internal-key': this.getInternalApiKey(),
  });
}

}
