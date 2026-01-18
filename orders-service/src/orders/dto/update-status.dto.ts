import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['CREATED', 'PAID', 'CANCELLED', 'SHIPPED'])
  status: 'CREATED' | 'PAID' | 'CANCELLED' | 'SHIPPED';
}
