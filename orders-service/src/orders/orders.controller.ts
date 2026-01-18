import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InternalGuard } from '../common/guards/internal.guard';

@Controller('orders')
@UseGuards(InternalGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Headers('x-user-id') userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required');
    }
    return this.ordersService.create(userId, dto);
  }

  @Get()
  findAll(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required');
    }
    return this.ordersService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(
    @Headers('x-user-id') userId: string,
    @Param('id') id: string,
  ) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required');
    }
    return this.ordersService.findOneByUser(userId, id);
  }

  @Patch(':id/status')
  updateStatus(
    @Headers('x-user-id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required');
    }
    return this.ordersService.updateStatus(userId, id, dto);
  }
}
