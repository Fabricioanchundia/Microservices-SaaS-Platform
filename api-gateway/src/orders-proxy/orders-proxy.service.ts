import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OrdersProxyService {
  private readonly ordersServiceUrl = process.env.ORDERS_SERVICE_URL;

  async forward(
    method: string,
    path: string,
    body?: any,
    headers?: Record<string, string>,
  ) {
    try {
      // 🔥 ESTA LÍNEA ES LA CLAVE (NO CAMBIAR)
      const url = `${this.ordersServiceUrl}/orders${path}`;

      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ Orders service error:', error?.response?.data || error.message);

      throw new HttpException(
        error?.response?.data || 'Orders service unavailable',
        error?.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
