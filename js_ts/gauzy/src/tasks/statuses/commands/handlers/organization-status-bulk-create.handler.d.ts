import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { OrganizationStatusBulkCreateCommand } from './../organization-status-bulk-create.command';
import { TaskStatusService } from './../../status.service';
import { TaskStatus } from './../../status.entity';
export declare class OrganizationStatusBulkCreateHandler implements ICommandHandler<OrganizationStatusBulkCreateCommand> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskStatusService);
    execute(command: OrganizationStatusBulkCreateCommand): Promise<ITaskStatus[] | TaskStatus[]>;
}
