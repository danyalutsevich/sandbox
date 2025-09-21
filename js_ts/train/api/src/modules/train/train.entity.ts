import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RouteEntity } from '../route/route.entity';
import { StationEntity } from '../station/station.entity';

@Entity({ name: 'train' })
export class TrainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  capacity: number;

  @Column()
  manufacturer: string;

  @Column()
  yearBuilt: number;

  @Column()
  status: string;

  @Column({ default: 0 })
  avgSpeed: number;

  @ManyToOne(() => StationEntity)
  nextStation: StationEntity;

  @ManyToOne(() => RouteEntity, route => route.trains)
  route: RouteEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
