import { IOrganizationProjectUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { OrganizationProjectDTO } from "./organization-project.dto";
declare const UpdateOrganizationProjectDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Partial<OrganizationProjectDTO>>;
/**
 * Update Organization Project DTO request validation
 */
export declare class UpdateOrganizationProjectDTO extends UpdateOrganizationProjectDTO_base implements IOrganizationProjectUpdateInput {
}
export {};
