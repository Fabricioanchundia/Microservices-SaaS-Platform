import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Order } from './entidad/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    const order = this.ordersRepo.create({
      userId,
      product: dto.product,
      price: dto.price,
      status: 'CREATED',
    });

    const savedOrder = await this.ordersRepo.save(order);

    try {
      await axios.post(
        `${process.env.NOTIFICATIONS_SERVICE_URL}/notifications/order-created`,
        {
          orderId: savedOrder.id,
          userId,
          product: savedOrder.product,
          price: savedOrder.price,
        },
        {
          headers: {
            'x-internal-key': process.env.INTERNAL_API_KEY,
          },
        },
      );
    } catch (error) {
      // Don't block order creation if notifications service is down
      console.error('Failed to send order-created notification', error);
    }

    return savedOrder;
  }

  async findAllByUser(userId: string) {
    return this.ordersRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
  async findOneByUser(userId: string, id: string) {
  const order = await this.ordersRepo.findOne({ where: { id, userId } });

  if (!order) {
    throw new NotFoundException('Order not found');
  }

  return order;
}
  async updateStatus(userId: string, id: string, dto: UpdateStatusDto) {
    const order = await this.findOneByUser(userId, id);
    order.status = dto.status;
    return this.ordersRepo.save(order);
  }
}
