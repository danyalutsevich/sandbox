import { IOrganizationTeamUpdateInput } from '../../../plugins/contracts';
import { OrganizationTeamDTO } from "./organization-team.dto";
/**
 * Update organization team request DTO's
 */
export declare class UpdateOrganizationTeamDTO extends OrganizationTeamDTO implements IOrganizationTeamUpdateInput {
    readonly id: string;
    readonly name: string;
}
