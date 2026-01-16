import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedRoute(@Req() req) {
    return {
      message: 'Access granted by API Gateway',
      user: req.user,
    };
  }
}
