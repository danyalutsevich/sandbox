import { IOrganizationTeamEmployeeUpdateInput } from '../../../plugins/contracts';
import { OrganizationTeamEmployee } from '../../core/entities/internal';
import { TenantOrganizationBaseDTO } from '../../core/dto';
declare const UpdateOrganizationTeamActiveTaskDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Pick<OrganizationTeamEmployee, "organizationTeamId" | "activeTaskId">>;
/**
 * Update team member active task entity DTO
 */
export declare class UpdateOrganizationTeamActiveTaskDTO extends UpdateOrganizationTeamActiveTaskDTO_base implements IOrganizationTeamEmployeeUpdateInput {
}
export {};
