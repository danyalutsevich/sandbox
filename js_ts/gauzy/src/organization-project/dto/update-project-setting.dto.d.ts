import { IOrganizationProjectSetting } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "../../core/dto";
export declare class UpdateProjectSettingDTO extends TenantOrganizationBaseDTO implements IOrganizationProjectSetting {
    readonly repositoryId: string;
    readonly isTasksAutoSync: boolean;
    readonly isTasksAutoSyncOnLabel: boolean;
    readonly syncTag: string;
}
