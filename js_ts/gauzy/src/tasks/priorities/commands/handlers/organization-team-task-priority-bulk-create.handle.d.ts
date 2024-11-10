import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTeamTaskPriorityBulkCreateCommand } from '../organization-team-task-priority-bulk-create.command';
import { TaskPriorityService } from './../../priority.service';
export declare class OrganizationTeamTaskPriorityBulkCreateHandler implements ICommandHandler<OrganizationTeamTaskPriorityBulkCreateCommand> {
    private readonly taskPriorityService;
    constructor(taskPriorityService: TaskPriorityService);
    execute(command: OrganizationTeamTaskPriorityBulkCreateCommand): Promise<ITaskStatus[]>;
}
