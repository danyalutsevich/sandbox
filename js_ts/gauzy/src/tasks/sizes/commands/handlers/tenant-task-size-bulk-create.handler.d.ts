import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskSize } from '../../../../../plugins/contracts/dist/index';
import { TenantTaskSizeBulkCreateCommand } from '../tenant-task-size-bulk-create.command';
import { TaskSizeService } from '../../size.service';
export declare class TenantTaskSizeBulkCreateHandler implements ICommandHandler<TenantTaskSizeBulkCreateCommand> {
    private readonly taskSizeService;
    constructor(taskSizeService: TaskSizeService);
    execute(command: TenantTaskSizeBulkCreateCommand): Promise<ITaskSize[]>;
}
