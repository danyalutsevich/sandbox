import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ServiceEntity } from '.';
import { ApiHideProperty } from '@nestjs/swagger';
import { AnswerEntity } from './Answer.entity';
import { RoleEntity } from './Role.entity';
import { UserRoleEntity } from './UserRole.entity';

@Entity({ name: 'users_table' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @OneToMany(() => ServiceEntity, (service) => service.owner, {})
  services: ServiceEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.user, {})
  answers: AnswerEntity[];

  // @ManyToMany(() => RoleEntity, (role) => role.users)
  // @JoinTable()
  // roles: RoleEntity[];

  @OneToMany(() => UserRoleEntity, (role) => role.user)
  roles: UserRoleEntity[];
}
