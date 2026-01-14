import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthProxyModule } from './auth-proxy/auth-proxy.module';
import { OrdersProxyModule } from './orders-proxy/orders-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    AuthProxyModule,
    OrdersProxyModule,
  ],
})
export class AppModule {}
