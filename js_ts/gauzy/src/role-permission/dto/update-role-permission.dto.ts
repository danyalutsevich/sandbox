import { IRolePermissionUpdateInput } from '../../../plugins/contracts';
import { CreateRolePermissionDTO } from "./create-role-permission.dto";

/**
 * Update Role Permission DTO validation
 */
export class UpdateRolePermissionDTO extends CreateRolePermissionDTO implements IRolePermissionUpdateInput {}