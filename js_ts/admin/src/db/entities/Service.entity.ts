import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '.';
import { OrderEntity } from './Order.entity';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.service)
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.services, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  owner: UserEntity;
}
