import { ITaskStatusFindInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from './../../../core/dto';
import { TaskStatus } from './../status.entity';
declare const StatusQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<TaskStatus, "projectId" | "organizationTeamId">>;
export declare class StatusQueryDTO extends StatusQueryDTO_base implements ITaskStatusFindInput {
}
export {};
