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
import { StationEntity } from '../station/station.entity';
import { TrainEntity } from '../train/train.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { IsNumber, IsString } from 'class-validator';

@Entity({ name: 'route' })
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column()
  distance: number;

  @IsNumber()
  @ManyToOne(() => StationEntity)
  originStation: StationEntity;

  @IsNumber()
  @ManyToOne(() => StationEntity)
  destinationStation: StationEntity;

  @OneToMany(() => TrainEntity, (train) => train.route)
  trains: TrainEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.route)
  schedules: ScheduleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
