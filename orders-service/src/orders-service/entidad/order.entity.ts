import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  product: string;

  @Column('decimal')
  price: number;

  @Column({ default: 'CREATED' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
