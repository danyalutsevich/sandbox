import { IOrganizationUpdateInput } from '../../../plugins/contracts';
import { CreateOrganizationDTO } from "./create-organization.dto";
import { OrganizationPublicSettingDTO } from "./organization-public-setting.dto";
declare const UpdateOrganizationDTO_base: import("@nestjs/common").Type<CreateOrganizationDTO & OrganizationPublicSettingDTO>;
/**
 * Organization Update DTO validation
 *
 */
export declare class UpdateOrganizationDTO extends UpdateOrganizationDTO_base implements IOrganizationUpdateInput {
}
export {};
