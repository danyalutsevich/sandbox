import { ITaskPriorityFindInput } from '../../../../plugins/contracts/dist/index';
import { TaskPriority } from '../priority.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
declare const TaskPriorityQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<TaskPriority, "projectId" | "organizationTeamId">>;
export declare class TaskPriorityQueryDTO extends TaskPriorityQueryDTO_base implements ITaskPriorityFindInput {
}
export {};
