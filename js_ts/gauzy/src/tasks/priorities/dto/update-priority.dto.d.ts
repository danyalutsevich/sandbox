import { ITaskPriorityUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TaskPriority } from '../priority.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
declare const UpdateTaskPriorityDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<TaskPriority>>;
export declare class UpdateTaskPriorityDTO extends UpdateTaskPriorityDTO_base implements ITaskPriorityUpdateInput {
}
export {};
