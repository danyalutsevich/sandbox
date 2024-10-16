import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { OrganizationProjectStatusBulkCreateCommand } from './../organization-project-status-bulk-create.command';
import { TaskStatusService } from './../../status.service';
import { TaskStatus } from './../../status.entity';
export declare class OrganizationProjectStatusBulkCreateHandler implements ICommandHandler<OrganizationProjectStatusBulkCreateCommand> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskStatusService);
    execute(command: OrganizationProjectStatusBulkCreateCommand): Promise<ITaskStatus[] & TaskStatus[]>;
}
