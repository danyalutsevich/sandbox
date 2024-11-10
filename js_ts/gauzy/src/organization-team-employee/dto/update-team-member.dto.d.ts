import { IOrganizationTeamEmployeeUpdateInput } from '../../../plugins/contracts';
import { OrganizationTeamEmployee } from './../../core/entities/internal';
import { UpdateOrganizationTeamActiveTaskDTO } from './update-organization-team-active-task.dto';
declare const UpdateTeamMemberDTO_base: import("@nestjs/common").Type<UpdateOrganizationTeamActiveTaskDTO & Pick<OrganizationTeamEmployee, "isTrackingEnabled" | "organizationTeamId">>;
/**
 * Update team member entity DTO
 */
export declare class UpdateTeamMemberDTO extends UpdateTeamMemberDTO_base implements IOrganizationTeamEmployeeUpdateInput {
}
export {};
