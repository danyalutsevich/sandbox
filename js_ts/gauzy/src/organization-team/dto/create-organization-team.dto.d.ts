import { IOrganizationTeamCreateInput } from '../../../plugins/contracts';
import { OrganizationTeamDTO } from "./organization-team.dto";
/**
 * Create organization team request DTO's
 */
export declare class CreateOrganizationTeamDTO extends OrganizationTeamDTO implements IOrganizationTeamCreateInput {
    readonly name: string;
    readonly profile_link?: string;
}
