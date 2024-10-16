import { OrganizationProjectBudgetTypeEnum, ProjectBillingEnum } from '../../../plugins/contracts';
import { OrganizationProject } from "./../organization-project.entity";
import { UpdateTaskModeDTO } from "./update-task-mode.dto";
declare const OrganizationProjectDTO_base: import("@nestjs/common").Type<Pick<OrganizationProject, "imageId"> & Partial<UpdateTaskModeDTO>>;
export declare class OrganizationProjectDTO extends OrganizationProjectDTO_base {
    readonly name: string;
    readonly billing: ProjectBillingEnum;
    readonly budgetType: OrganizationProjectBudgetTypeEnum;
}
export {};
