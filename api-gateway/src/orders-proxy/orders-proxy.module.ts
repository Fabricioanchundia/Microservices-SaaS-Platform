import { Module } from '@nestjs/common';
import { OrdersProxyController } from './orders-proxy.controller';
import { OrdersProxyService } from './orders-proxy.service';
import { JwtStrategy } from '../common/guards/jwt.strategy';

@Module({
  controllers: [OrdersProxyController],
  providers: [OrdersProxyService, JwtStrategy],
})
export class OrdersProxyModule {}
