import { ITaskPriorityCreateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
import { TaskPriority } from '../priority.entity';
declare const CreateTaskPriorityDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & TaskPriority>;
export declare class CreateTaskPriorityDTO extends CreateTaskPriorityDTO_base implements ITaskPriorityCreateInput {
}
export {};
