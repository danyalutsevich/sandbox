import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoleEntity } from './UserRole.entity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  // @ManyToMany(() => UserEntity, (user) => user.roles)
  // users: UserEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  users: UserRoleEntity[];
}
