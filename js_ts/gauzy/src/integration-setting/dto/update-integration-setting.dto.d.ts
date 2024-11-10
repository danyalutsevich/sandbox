import { IIntegrationSettingUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "../../core/dto";
declare const UpdateIntegrationSettingDTO_base: import("@nestjs/mapped-types").MappedType<TenantOrganizationBaseDTO>;
/**
 *
 */
export declare class UpdateIntegrationSettingDTO extends UpdateIntegrationSettingDTO_base implements IIntegrationSettingUpdateInput {
    settingsValue: string;
}
export {};
