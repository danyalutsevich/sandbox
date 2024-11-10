import { IOrganizationProjectUpdateInput, TaskListTypeEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
/**
 * Update task list view mode DTO validation
 */
export declare class UpdateTaskModeDTO extends TenantOrganizationBaseDTO implements IOrganizationProjectUpdateInput {
    readonly taskListType: TaskListTypeEnum;
}
