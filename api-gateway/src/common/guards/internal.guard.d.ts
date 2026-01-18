import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class InternalGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
