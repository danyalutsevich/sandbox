import { IOrganizationTeamEmployeeFindInput } from '../../../plugins/contracts';
import { DeleteQueryDTO } from "./../../shared/dto";
import { OrganizationTeamEmployee } from "./../../core/entities/internal";
declare const DeleteTeamMemberQueryDTO_base: import("@nestjs/common").Type<Pick<OrganizationTeamEmployee, "organizationTeamId"> & DeleteQueryDTO<unknown>>;
/**
 * Delete team member query DTO
 */
export declare class DeleteTeamMemberQueryDTO extends DeleteTeamMemberQueryDTO_base implements IOrganizationTeamEmployeeFindInput {
}
export {};
