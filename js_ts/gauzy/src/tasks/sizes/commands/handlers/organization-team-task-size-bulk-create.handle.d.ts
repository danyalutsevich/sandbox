import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTeamTaskSizeBulkCreateCommand } from '../organization-team-task-size-bulk-create.command';
import { TaskSizeService } from './../../size.service';
export declare class OrganizationTeamTaskSizeBulkCreateHandler implements ICommandHandler<OrganizationTeamTaskSizeBulkCreateCommand> {
    private readonly taskSizeService;
    constructor(taskSizeService: TaskSizeService);
    execute(command: OrganizationTeamTaskSizeBulkCreateCommand): Promise<ITaskStatus[]>;
}
