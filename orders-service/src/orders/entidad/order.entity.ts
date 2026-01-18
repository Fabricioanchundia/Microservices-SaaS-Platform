import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type OrderStatus = 'CREATED' | 'PAID' | 'CANCELLED' | 'SHIPPED';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  product: string;

  @Column('numeric')
  price: number;

  @Column({ type: 'varchar', default: 'CREATED' })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;
}
