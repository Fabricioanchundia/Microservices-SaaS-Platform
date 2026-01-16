import { Module } from '@nestjs/common';
import { OrdersProxyController } from './orders-proxy.controller';
import { HealthModule } from '../health/health.module';
import { AuthProxyModule } from '../auth-proxy/auth-proxy.module';
import { OrdersProxyService } from './orders-proxy.service';
import { JwtStrategy } from '../common/guards/jwt.strategy';

@Module({
  imports: [HealthModule, AuthProxyModule],
  controllers: [OrdersProxyController],
  providers: [OrdersProxyService, JwtStrategy],
})
export class OrdersProxyModule {}
