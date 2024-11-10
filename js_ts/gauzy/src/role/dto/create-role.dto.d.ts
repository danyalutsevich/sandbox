import { IRoleCreateInput } from '../../../plugins/contracts';
import { TenantBaseDTO } from "./../../core/dto";
/**
 * Create Role DTO validation
 */
export declare class CreateRoleDTO extends TenantBaseDTO implements IRoleCreateInput {
    readonly name: string;
}
