import { ITaskCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
import { Task } from "./../task.entity";
declare const CreateTaskDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Omit<Task, "organization" | "organizationId">>;
/**
 * Create task validation request DTO
 */
export declare class CreateTaskDTO extends CreateTaskDTO_base implements ITaskCreateInput {
}
export {};
