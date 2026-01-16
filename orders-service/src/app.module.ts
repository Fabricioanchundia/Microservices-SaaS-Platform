import { Module } from '@nestjs/common';
import { OrdersController } from './orders-service/orders.controller';

@Module({
  controllers: [OrdersController],
})
export class AppModule {}
