import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders-service/orders.controller';
import { OrdersService } from './orders-service/orders.service';
import { Order } from './orders-service/entidad/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Order],
      synchronize: true, // ⚠️ solo dev
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
