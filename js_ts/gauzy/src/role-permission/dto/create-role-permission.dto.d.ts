import { IRole, IRolePermissionCreateInput, PermissionsEnum } from '../../../plugins/contracts';
import { TenantBaseDTO } from "./../../core/dto";
/**
 * Create Role Permission DTO validation
 */
export declare class CreateRolePermissionDTO extends TenantBaseDTO implements IRolePermissionCreateInput {
    readonly permission: PermissionsEnum;
    readonly enabled: boolean;
    readonly roleId: string;
    readonly role: IRole;
}
