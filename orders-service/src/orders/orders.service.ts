import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    return this.ordersRepo.save(order);
  }

  async findAll() {
    return this.ordersRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findAllByUser(userId: string) {
    return this.ordersRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByUser(userId: string, id: string) {
    const order = await this.ordersRepo.findOne({ where: { id, userId } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findOneById(id: string) {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ✅ SOLO ADMIN actualiza status (y puede actualizar cualquier order)
  async updateStatus(
    userId: string,
    role: string,
    id: string,
    dto: UpdateStatusDto,
  ) {
    const normalizedRole = (role ?? '').trim().toLowerCase();
    if (normalizedRole !== 'admin') {
      throw new ForbiddenException('Only ADMIN can update order status');
    }

    const order = await this.findOneById(id); // 🔥 CLAVE: NO por userId
    order.status = dto.status;
    return this.ordersRepo.save(order);
  }
}
