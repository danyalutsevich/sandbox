import { CommandBus } from '@nestjs/cqrs';
import { IOrganizationTeamJoinRequest, IPagination, LanguagesEnum, OrganizationTeamJoinRequestStatusEnum } from '../../plugins/contracts/dist/index';
import { PaginationParams } from 'core/crud';
import { OrganizationTeamJoinRequest } from './organization-team-join-request.entity';
import { OrganizationTeamJoinRequestService } from './organization-team-join-request.service';
import { ValidateJoinRequestDTO } from './dto';
export declare class OrganizationTeamJoinRequestController {
    private readonly _commandBus;
    private readonly _organizationTeamJoinRequestService;
    constructor(_commandBus: CommandBus, _organizationTeamJoinRequestService: OrganizationTeamJoinRequestService);
    /**
     * Validate organization team join request
     *
     * @param params
     * @returns
     */
    validateJoinRequest(entity: ValidateJoinRequestDTO): Promise<IOrganizationTeamJoinRequest>;
    /**
     * Get organization team join requests
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<OrganizationTeamJoinRequest>): Promise<IPagination<IOrganizationTeamJoinRequest>>;
    /**
     * Create organization team join request.
     *
     * @param entity
     * @returns
     */
    create(entity: OrganizationTeamJoinRequest, languageCode: LanguagesEnum): Promise<Object>;
    /**
     * Resend email verification code
     *
     * @returns
     */
    resendConfirmationCode(entity: OrganizationTeamJoinRequest): Promise<Object>;
    acceptRequestToJoin(id: string, action: OrganizationTeamJoinRequestStatusEnum, languageCode: LanguagesEnum): Promise<void>;
}
