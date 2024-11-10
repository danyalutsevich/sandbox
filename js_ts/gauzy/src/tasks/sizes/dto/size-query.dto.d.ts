import { ITaskSizeFindInput } from '../../../../plugins/contracts/dist/index';
import { TaskSize } from '../size.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
declare const TaskSizeQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<TaskSize, "projectId" | "organizationTeamId">>;
export declare class TaskSizeQueryDTO extends TaskSizeQueryDTO_base implements ITaskSizeFindInput {
}
export {};
