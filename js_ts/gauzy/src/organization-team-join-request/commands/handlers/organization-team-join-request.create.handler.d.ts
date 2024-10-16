import { ICommandHandler } from '@nestjs/cqrs';
import { OrganizationTeamJoinRequestService } from '../../organization-team-join-request.service';
import { OrganizationTeamJoinRequestCreateCommand } from '../organization-team-join-request.create.command';
export declare class OrganizationTeamJoinRequestCreateHandler implements ICommandHandler<OrganizationTeamJoinRequestCreateCommand> {
    private readonly _organizationTeamJoinRequestService;
    constructor(_organizationTeamJoinRequestService: OrganizationTeamJoinRequestService);
    execute(command: OrganizationTeamJoinRequestCreateCommand): Promise<Object>;
}
