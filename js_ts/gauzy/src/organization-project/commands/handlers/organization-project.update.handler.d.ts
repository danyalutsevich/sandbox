import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganizationProject } from '../../../../plugins/contracts/dist/index';
import { OrganizationProjectUpdateCommand } from '../organization-project.update.command';
import { OrganizationProjectService } from '../../organization-project.service';
export declare class OrganizationProjectUpdateHandler implements ICommandHandler<OrganizationProjectUpdateCommand> {
    private readonly _organizationProjectService;
    constructor(_organizationProjectService: OrganizationProjectService);
    execute(command: OrganizationProjectUpdateCommand): Promise<IOrganizationProject>;
}
