import { ITaskVersionUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskVersion } from '../version.entity';
declare const UpdatesVersionDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<TaskVersion>>;
export declare class UpdatesVersionDTO extends UpdatesVersionDTO_base implements ITaskVersionUpdateInput {
}
export {};
