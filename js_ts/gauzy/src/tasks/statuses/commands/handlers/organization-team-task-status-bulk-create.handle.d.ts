import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTeamTaskStatusBulkCreateCommand } from './../organization-team-task-status-bulk-create.command';
import { TaskStatusService } from './../../status.service';
export declare class OrganizationTeamTaskStatusBulkCreateHandler implements ICommandHandler<OrganizationTeamTaskStatusBulkCreateCommand> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskStatusService);
    execute(command: OrganizationTeamTaskStatusBulkCreateCommand): Promise<ITaskStatus[]>;
}
