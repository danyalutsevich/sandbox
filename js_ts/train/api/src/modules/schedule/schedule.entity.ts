import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { RouteEntity } from '../route/route.entity';
import { TrainEntity } from '../train/train.entity';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RouteEntity, (route) => route.schedules)
  route: RouteEntity;

  @ManyToOne(() => TrainEntity, (train) => train.schedules)
  train: TrainEntity;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column({ nullable: true })
  platform: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
