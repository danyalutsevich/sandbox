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
import { IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IdObjectDto } from '@/utils/dto/idObj.dto';
import { IsIdOrObject } from '@/utils/validator/idObj.validator';

@Entity({ name: 'train' })
export class TrainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  type: string;

  @IsNumber()
  @Column()
  capacity: number;

  @IsString()
  @Column()
  manufacturer: string;

  @IsNumber()
  @Column()
  yearBuilt: number;

  @IsString()
  @Column()
  status: string;

  @IsNumber()
  @Min(0)
  @Column({ default: 0 })
  avgSpeed: number;

  @IsIdOrObject()
  @ManyToOne(() => StationEntity)
  nextStation: StationEntity;

  @IsIdOrObject()
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
