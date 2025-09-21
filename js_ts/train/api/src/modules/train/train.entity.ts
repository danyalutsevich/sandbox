import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RouteEntity } from '../route/route.entity';
import { StationEntity } from '../station/station.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

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

  @ManyToOne(() => RouteEntity, (route) => route.trains)
  route: RouteEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.train)
  schedules: ScheduleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
