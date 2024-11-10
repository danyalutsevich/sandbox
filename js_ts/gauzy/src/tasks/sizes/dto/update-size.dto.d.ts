import { ITaskSizeUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
import { TaskSize } from '../size.entity';
declare const UpdateTaskSizeDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<TaskSize>>;
export declare class UpdateTaskSizeDTO extends UpdateTaskSizeDTO_base implements ITaskSizeUpdateInput {
}
export {};
