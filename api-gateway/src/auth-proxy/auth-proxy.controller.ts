import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthProxyService } from './auth-proxy.service';

@ApiTags('auth')
@Controller('auth')
export class AuthProxyController {
  constructor(private readonly authProxy: AuthProxyService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authProxy.forward('POST', '/auth/register', body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authProxy.forward('POST', '/auth/login', body);
  }
}
