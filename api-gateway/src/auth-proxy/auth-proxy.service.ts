import { Injectable, BadGatewayException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthProxyService {
  private baseUrl = process.env.AUTH_SERVICE_URL;

  async forward(method: string, path: string, body?: any, headers?: any) {
    try {
      const url = `${this.baseUrl}${path}`;
      const res = await axios.request({
        method,
        url,
        data: body,
        headers,
      });
      return res.data;
    } catch (err: any) {
      throw new BadGatewayException(
        err?.response?.data || 'Auth service unavailable',
      );
    }
  }
}
