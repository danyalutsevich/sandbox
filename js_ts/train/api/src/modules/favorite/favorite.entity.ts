import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { IsNumber } from 'class-validator';

@Entity({ name: 'favorite' })
@Unique(['user', 'schedule'])
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

  @IsNumber()
  @ManyToOne(() => ScheduleEntity, { nullable: false })
  schedule: ScheduleEntity;

  @CreateDateColumn()
  createdAt: Date;
}
