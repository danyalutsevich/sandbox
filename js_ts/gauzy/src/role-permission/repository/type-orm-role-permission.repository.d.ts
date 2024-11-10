import { Repository } from 'typeorm';
import { RolePermission } from '../role-permission.entity';
export declare class TypeOrmRolePermissionRepository extends Repository<RolePermission> {
    readonly repository: Repository<RolePermission>;
    constructor(repository: Repository<RolePermission>);
}
