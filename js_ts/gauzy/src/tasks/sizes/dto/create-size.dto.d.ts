import { ITaskSizeCreateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskSize } from '../size.entity';
declare const CreateTaskSizeDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & TaskSize>;
export declare class CreateTaskSizeDTO extends CreateTaskSizeDTO_base implements ITaskSizeCreateInput {
}
export {};
