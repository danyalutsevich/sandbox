import { ITaskVersionFindInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskVersion } from '../version.entity';
declare const VersionQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<TaskVersion, "projectId" | "organizationTeamId">>;
export declare class VersionQueryDTO extends VersionQueryDTO_base implements ITaskVersionFindInput {
}
export {};
