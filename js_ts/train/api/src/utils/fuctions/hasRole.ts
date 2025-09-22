import { UserEntity } from '../entities';
import { Role } from '../enums/role.enum';

export function hasRole(user: UserEntity, role: Role) {
  return user.role == role;
}
