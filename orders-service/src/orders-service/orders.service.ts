import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders-service/entidad/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
  ) {}

  async create(userId: string, body: any) {
    const order = this.ordersRepo.create({
      userId,
      product: body.product,
      price: body.price,
      status: 'CREATED',
    });

    return this.ordersRepo.save(order);
  }

  async findByUser(userId: string) {
    return this.ordersRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}
