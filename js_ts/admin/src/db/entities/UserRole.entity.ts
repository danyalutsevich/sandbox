import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity, UserEntity } from '.';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user_role' })
export class UserRoleEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Exclude()
  @PrimaryGeneratedColumn()
  roleId: number;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @Column()
  active: boolean;
}
