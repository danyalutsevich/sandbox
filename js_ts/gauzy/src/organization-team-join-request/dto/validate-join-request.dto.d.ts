import { IOrganizationTeamJoinRequestValidateInput } from '../../../plugins/contracts';
import { UserEmailDTO } from "../../user/dto";
import { OrganizationTeamJoinRequest } from "../organization-team-join-request.entity";
declare const ValidateJoinRequestDTO_base: import("@nestjs/common").Type<UserEmailDTO & Pick<OrganizationTeamJoinRequest, "organizationTeamId">>;
/**
 * Validate team join request DTO validation
 */
export declare class ValidateJoinRequestDTO extends ValidateJoinRequestDTO_base implements IOrganizationTeamJoinRequestValidateInput {
    readonly code: string;
    readonly token: string;
}
export {};
