import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class InternalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const internalKey = request.headers['x-internal-key'];

    if (internalKey !== process.env.INTERNAL_API_KEY) {
      throw new ForbiddenException('Internal access only');
    }

    return true;
  }
}
