import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskStatus } from '../../../../../plugins/contracts/dist/index';
import { TenantStatusBulkCreateCommand } from './../tenant-status-bulk-create.command';
import { TaskStatusService } from './../../status.service';
import { TaskStatus } from './../../status.entity';
export declare class TenantStatusBulkCreateHandler implements ICommandHandler<TenantStatusBulkCreateCommand> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskStatusService);
    execute(command: TenantStatusBulkCreateCommand): Promise<ITaskStatus[] & TaskStatus[]>;
}
