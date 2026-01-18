import { Injectable, HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

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
      const url = `${this.ordersServiceUrl}/orders${path}`;

      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      // 🔥 CLAVE: reenviar el error REAL del microservicio
      if (err.response) {
        throw new HttpException(
          err.response.data || err.message,
          err.response.status,
        );
      }

      // Error de red / servicio caído
      throw new HttpException(
        'Orders service unavailable',
        502,
      );
    }
  }
}
