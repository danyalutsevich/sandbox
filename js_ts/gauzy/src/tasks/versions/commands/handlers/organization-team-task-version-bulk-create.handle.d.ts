import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskVersion } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTeamTaskVersionBulkCreateCommand } from '../organization-team-task-version-bulk-create.command';
import { TaskVersionService } from '../../version.service';
export declare class OrganizationTeamTaskVersionBulkCreateHandler implements ICommandHandler<OrganizationTeamTaskVersionBulkCreateCommand> {
    private readonly taskVersionService;
    constructor(taskVersionService: TaskVersionService);
    execute(command: OrganizationTeamTaskVersionBulkCreateCommand): Promise<ITaskVersion[]>;
}
