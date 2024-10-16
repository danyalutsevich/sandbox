import { IOrganizationContactCreateInput } from '../../../plugins/contracts';
import { OrganizationContactDTO } from "./organization-contact.dto";
import { RelationalTagDTO } from "./../../tags/dto";
declare const CreateOrganizationContactDTO_base: import("@nestjs/common").Type<RelationalTagDTO & OrganizationContactDTO>;
/**
 * Create Organization Contact DTO request validation
 */
export declare class CreateOrganizationContactDTO extends CreateOrganizationContactDTO_base implements IOrganizationContactCreateInput {
}
export {};
