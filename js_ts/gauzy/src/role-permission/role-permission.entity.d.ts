import { IRolePermission } from '../../plugins/contracts/dist/index';
import { Role, TenantBaseEntity } from '../core/entities/internal';
export declare class RolePermission extends TenantBaseEntity implements IRolePermission {
    permission: string;
    enabled: boolean;
    description: string;
    role: Role;
    roleId: string;
}
