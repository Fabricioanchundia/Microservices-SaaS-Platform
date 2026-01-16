import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/jwt.strategy';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { AuthProxyModule } from './auth-proxy/auth-proxy.module';
import { OrdersProxyModule } from './orders-proxy/orders-proxy.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    HealthModule,
    AuthProxyModule,
    OrdersProxyModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
