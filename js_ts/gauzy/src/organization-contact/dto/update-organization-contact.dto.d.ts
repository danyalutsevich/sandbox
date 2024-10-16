import { IOrganizationContactUpdateInput } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { OrganizationContactDTO } from "./organization-contact.dto";
declare const UpdateOrganizationContactDTO_base: import("@nestjs/common").Type<RelationalTagDTO & OrganizationContactDTO>;
/**
 * Update Organization Contact DTO request validation
 */
export declare class UpdateOrganizationContactDTO extends UpdateOrganizationContactDTO_base implements IOrganizationContactUpdateInput {
}
export {};
