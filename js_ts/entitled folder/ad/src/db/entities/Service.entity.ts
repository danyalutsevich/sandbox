import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation,BaseEntity } from 'typeorm';
import { UserEntity } from './User.entity.js';

@Entity({ name: 'service' })
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.services)
  owner: Relation<UserEntity>;
}
