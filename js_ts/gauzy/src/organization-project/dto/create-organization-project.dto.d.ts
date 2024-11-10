import { IOrganizationProjectCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { OrganizationProjectDTO } from "./organization-project.dto";
declare const CreateOrganizationProjectDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & OrganizationProjectDTO>;
/**
 * Create Organization Project DTO request validation
 */
export declare class CreateOrganizationProjectDTO extends CreateOrganizationProjectDTO_base implements IOrganizationProjectCreateInput {
}
export {};
