import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceEntity } from './Service.entity';

@Entity({ name: 'order' })
export class OrderEntity {
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

  @ManyToOne(() => ServiceEntity, (service) => service.orders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  service: ServiceEntity;
}
