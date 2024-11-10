import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
import { OrganizationProjectCreateCommand } from '../organization-project.create.command';
import { OrganizationProjectService } from '../../organization-project.service';
export declare class OrganizationProjectCreateHandler implements ICommandHandler<OrganizationProjectCreateCommand> {
    private readonly _commandBus;
    private readonly _organizationProjectService;
    constructor(_commandBus: CommandBus, _organizationProjectService: OrganizationProjectService);
    execute(command: OrganizationProjectCreateCommand): Promise<IOrganizationProject>;
}
