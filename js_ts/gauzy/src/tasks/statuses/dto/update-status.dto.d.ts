import { ITaskStatusUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
import { TaskStatus } from '../status.entity';
declare const UpdatesStatusDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<TaskStatus>>;
export declare class UpdatesStatusDTO extends UpdatesStatusDTO_base implements ITaskStatusUpdateInput {
}
export {};
