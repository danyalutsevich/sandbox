import { ICommandHandler } from '@nestjs/cqrs';
import { ITaskSize } from '../../../../../plugins/contracts/dist/index';
import { OrganizationTaskSizeBulkCreateCommand } from '../organization-task-size-bulk-create.command';
import { TaskSizeService } from './../../size.service';
export declare class OrganizationTaskSizeBulkCreateHandler implements ICommandHandler<OrganizationTaskSizeBulkCreateCommand> {
    private readonly taskStatusService;
    constructor(taskStatusService: TaskSizeService);
    execute(command: OrganizationTaskSizeBulkCreateCommand): Promise<ITaskSize[]>;
}
