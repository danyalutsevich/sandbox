import { IRolePermission, IRole } from '../../plugins/contracts/dist/index';
import { TenantBaseEntity } from '../core/entities/internal';
export declare class Role extends TenantBaseEntity implements IRole {
    name: string;
    isSystem?: boolean;
    /**
     * Role Permissions
     */
    rolePermissions?: IRolePermission[];
}
