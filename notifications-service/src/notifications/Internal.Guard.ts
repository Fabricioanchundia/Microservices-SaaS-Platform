import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class InternalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const internalKey = req.headers['x-internal-key'];
    const expectedKey = process.env.INTERNAL_API_KEY;

    if (!internalKey || internalKey !== expectedKey) {
      throw new ForbiddenException('Internal access only');
    }

    return true;
  }
}
