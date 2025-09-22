import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity({ name: 'favorite' })
@Unique(['user', 'schedule'])
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => ScheduleEntity, { nullable: false })
  schedule: ScheduleEntity;

  @CreateDateColumn()
  createdAt: Date;
}


