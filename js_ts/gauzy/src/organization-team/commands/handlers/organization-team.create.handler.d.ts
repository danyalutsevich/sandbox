import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationTeam } from '../../../../plugins/contracts/dist/index';
import { OrganizationTeamCreateCommand } from '../organization-team.create.command';
import { OrganizationTeamService } from './../../organization-team.service';
export declare class OrganizationTeamCreateHandler implements ICommandHandler<OrganizationTeamCreateCommand> {
    private readonly _commandBus;
    private readonly _organizationTeamService;
    constructor(_commandBus: CommandBus, _organizationTeamService: OrganizationTeamService);
    execute(command: OrganizationTeamCreateCommand): Promise<IOrganizationTeam>;
}
