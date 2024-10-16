import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskPriority } from '../../../../../plugins/contracts/dist/index';
import { TenantTaskPriorityBulkCreateCommand } from '../tenant-task-priority-bulk-create.command';
import { TaskPriorityService } from '../../priority.service';
export declare class TenantTaskPriorityBulkCreateHandler implements ICommandHandler<TenantTaskPriorityBulkCreateCommand> {
    private readonly taskPriorityService;
    constructor(taskPriorityService: TaskPriorityService);
    execute(command: TenantTaskPriorityBulkCreateCommand): Promise<ITaskPriority[]>;
}
