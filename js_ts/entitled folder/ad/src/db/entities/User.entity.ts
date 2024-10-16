import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation, BaseEntity } from 'typeorm';
import { ServiceEntity } from './Service.entity.js';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ServiceEntity, (service) => service.owner)
  services: Relation<ServiceEntity>[];
}
