import { IOrganizationTaskSetting } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { OrganizationTaskSetting } from './../organization-task-setting.entity';
declare const OrganizationTaskSettingDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Omit<OrganizationTaskSetting, "organization" | "organizationId">>;
export declare class OrganizationTaskSettingDTO extends OrganizationTaskSettingDTO_base implements IOrganizationTaskSetting {
}
export {};
