import { CurrenciesEnum, IOrganizationCreateInput } from '../../../plugins/contracts';
import { Organization } from "./../organization.entity";
import { RelationalTagDTO } from "./../../tags/dto";
import { OrganizationBonusesDTO } from "./organization-bonuses.dto";
import { OrganizationSettingDTO } from "./organization-setting.dto";
declare const CreateOrganizationDTO_base: import("@nestjs/common").Type<OrganizationBonusesDTO & Pick<Organization, "imageId" | "upworkOrganizationId" | "upworkOrganizationName"> & RelationalTagDTO & OrganizationSettingDTO>;
/**
 * Organization Create DTO validation
 *
 */
export declare class CreateOrganizationDTO extends CreateOrganizationDTO_base implements IOrganizationCreateInput {
    readonly name: string;
    readonly currency: CurrenciesEnum;
}
export {};
