import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InternalGuard } from '../common/guards/internal.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('admin/all')
  @UseGuards(InternalGuard)
  findAllAdmin() {
    return this.ordersService.findAll();
  }

  @Post()
  create(
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.create(userId, dto);
  }

  @Get()
  findAll(@Headers('x-user-id') userId: string) {
    return this.ordersService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(
    @Headers('x-user-id') userId: string,
    @Param('id') id: string,
  ) {
    return this.ordersService.findOneByUser(userId, id);
  }

  // 🔥 SOLO ADMIN
@Patch(':id/status')
updateStatus(
  @Headers('x-user-id') userId: string,
  @Headers('x-user-role') role: string,
  @Param('id') id: string,
  @Body() dto: UpdateStatusDto,
) {
  return this.ordersService.updateStatus(userId, role, id, dto);
}

}