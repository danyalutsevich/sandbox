import { IGetTaskOptions } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from '../../core/dto';
import { Task } from "./../task.entity";
declare const TaskMaxNumberQueryDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Pick<Task, "projectId">>;
/**
 * GET task max number DTO validation
 */
export declare class TaskMaxNumberQueryDTO extends TaskMaxNumberQueryDTO_base implements IGetTaskOptions {
}
export {};
